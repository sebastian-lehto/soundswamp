const { Pool } = require('pg');

const user = process.env.USER1;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const database = process.env.DATABASE;

const pool = new Pool({user, password, host, port, database});

module.exports = pool;