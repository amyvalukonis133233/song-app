const client = require('../db/dbSetup')
const retrieveSongFromFilePath = require('../helpers/stub')

//adds a new song to the database
const createSong = function (songObject) {
    const {name, genre, artist, length, path, ranking} = songObject
    const command = 'INSERT INTO songs (name, genre, artist, length, file_path, ranking) VALUES (($1), ($2), ($3), ($4), ($5), ($6)) RETURNING *'
    const values = [name, genre, artist, length, path, ranking]
    return client.query(command, values).then((response) => {
        return response.rows[0]
    })
}

const deleteSong = function (songId) {
    const command = 'DELETE FROM songs WHERE id = ($1)'
    values = [songId]
    return client.query(command, values).then((response) => {
        return true
    })
}

const updateSong = function (songObject, songId) {
    const query = updateSongById(songId, songObject);
    const colValues = Object.keys(songObject).map(function (key) {
        return songObject[key];
      });
    return client.query(query, colValues).then((response) => {
        return true
    })
}

const getSong = function (songId) {
    const command = "SELECT file_path FROM songs WHERE id = ($1);"
    const values = [songId]
    return client.query(command, values).then((response) => {
        return retrieveSongFromFilePath(response.rows[0])
    })
}

function updateSongById (id, cols) {
    const query = ['UPDATE songs'];
    query.push('SET');
  
    const set = [];
    Object.keys(cols).forEach(function (key, i) {
      set.push(key + ' = ($' + (i + 1) + ')'); 
    });
    query.push(set.join(', '));
  
    //this should be parameterized properly to avoid sql injection attacks
    query.push('WHERE id = ' + id );
  
    return query.join(' ');
  }

module.exports = {createSong, deleteSong, updateSong, getSong}