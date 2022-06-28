import pg from './pg.js';
import mysql from './mysql.js';
import mongo from './mongodb.js';

export default Object.freeze({
  pg,
  mysql,
  mongo,
  engine: process.env.DB_ENGINE,
});
