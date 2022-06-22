import pg from './pg.js';
import mysql from './mysql.js';

export default Object.freeze({
  pg,
  mysql,
  engine: process.env.DB_ENGINE,
});
