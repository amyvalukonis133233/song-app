const { Client } = require('pg');

const client = new Client({
    host: process.env.HOST,
    user: 'postgres',
    password: 'PUTPASSWORDHERE',
    port: 5432, 
    database: process.env.DATABASE
});
client.connect();

module.exports = client 