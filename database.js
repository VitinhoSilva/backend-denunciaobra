require('dotenv').config();
const { Pool } = require('pg');
const { postgres } = require('./.env');

module.exports = {
    
  async connection(app){
      const pool = new Pool({
        user: postgres.DB_USER,
        host: postgres.DB_HOST,
        database: postgres.DB_DATABASE,
        password: postgres.DB_PASSWORD,
        port: postgres.DB_PORT,
      });

      return await pool;
  }
  
}