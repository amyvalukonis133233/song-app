const {Client}  = require('pg')
const request = require('supertest')
const app = require('../src/app')

jest.mock('pg', () => {
    const mClient = {
      connect: jest.fn(),
      query: jest.fn(),
      end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});

describe('songs handler', () => {
    let client 
    beforeEach(() => {
        client = new Client();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
    
    test('Should return 200 on successful creation', async () => {
        const songObject = {name: 'test song', genre: 'pop', artist: 'an artist',
        length: 200, 
        path: 'thisisafilepath',
        ranking: 4} 
        client.query.mockResolvedValueOnce({ rows: [{...songObject}], rowCount: 0 });

        await request(app)
            .post('/songs')
            .send(songObject) 
            .expect(200)
        expect(client.query).toBeCalledWith('INSERT INTO songs (name, genre, artist, length, file_path, ranking) VALUES (($1), ($2), ($3), ($4), ($5), ($6)) RETURNING *', ["test song", "pop", "an artist", 200, "thisisafilepath", 4])
    })

    test('Should return 200 on successful song update', async () => {
        const songObject = {ranking: 5} 
        client.query.mockResolvedValueOnce({ rows: [{...songObject}], rowCount: 0 });

        await request(app)
            .put('/songs/4')
            .send(songObject) 
            .expect(200)
        expect(client.query).toBeCalledWith('UPDATE songs SET ranking = ($1) WHERE id = 4', [5])
    })

    test('Should return 204 on successful song deletion', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });

        await request(app)
            .delete('/songs/4')
            .send() 
            .expect(204)
        expect(client.query).toBeCalledWith('DELETE FROM songs WHERE id = ($1)',["4"])
    })

    test('Should return 200 on successful song get', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });

        await request(app)
            .get('/songs/4')
            .send() 
            .expect(200)
        expect(client.query).toBeCalledWith('SELECT file_path FROM songs WHERE id = ($1);',["4"])
    })
    
    test('Should return 400 on invalid input for song creation', async () => {
        const songObject = {name: 'test song', genre: 'pop', artist: 'an artist',
        length: 200, 
        path: 'thisisafilepath',
        ranking: 10} 

        await request(app)
            .post('/songs')
            .send(songObject) 
            .expect(400)

        expect(client.query).toBeCalledTimes(0);
    })
})

