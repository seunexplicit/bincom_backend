import { Sequelize } from 'sequelize';
import path from 'path';
import './environment'
import { readAFile } from './module/file.module';

export const sequelize = new Sequelize(
     process.env.DB_NAME||'',
     process.env.DB_USERNAME||'',
     process.env.DB_PASSWORD||'',
     {
          host: process.env.DB_HOST ?? 'localhost',
          dialect: 'mysql'
     }
)

const sqlPath = path.resolve(__dirname, './bincom_test.sql');

(async () => {
     const queryString = await readAFile(sqlPath);
     sequelize.query(queryString)
})();

