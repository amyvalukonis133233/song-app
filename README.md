# song-app

In order to run the program and its various endpoints, you must configure a local version of postgres. 

In src/db/dbSetup.js, enter in your user credentials for your local postgres where it says new Client(). 

Once you have a local version of postgres up and running, you must configure a table and enum that is compatible with this program. Run the following commands in either psql or a similar db gui: 

    CREATE TYPE genre_type AS ENUM ('rock', 'pop', 'rap', 'rb');

    CREATE TABLE songs (id SERIAL PRIMARY KEY, name varchar(255) NOT NULL, artist varchar(255) NOT NULL, length int NOT NULL, file_path varchar (2056) NOT NULL, genre genre_type NOT NULL, ranking int);

To run in development mode: 

    1) Navigate to the song-app directory root for this project
    2) From the terminal run "npm run dev" 

To run unit tests:
    1) Navigate to the song-app directory root for this project
    2) From the terminal run "npm test"

Here are the endpoints that can be run and functionality for each:

    1) Play song -> GET /songs/:id -> returns 
    2) Update song -> PUT /songs/:id (body contains data to update) -> returns appropriate HTTP status code
    3) Delete song -> DELETE /songs/:id -> returns appropraite HTTP status code 
    3) Create song -> POST /songs (body contains data to create) -> returns newly created song

Note: updateSongById() function in src/db/dbSetup.js was pulled from StackOverlow. If given more time, would implement properly.
As a final note, if given more time would test more features like whether cloud step function is called properly and other error cases throughout. 