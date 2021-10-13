import { QueryTypes, Sequelize } from 'sequelize';
import { config as config_dotenv } from 'dotenv';
import path from 'path';
import './environment'
import { readAFile } from './module/file.module';
import importer from 'mysql-import';



switch (process.env.NODE_ENV) {
     case 'production':
          config_dotenv({
               path: path.resolve(__dirname, '../.env')
          })
          break
     case 'development':
          config_dotenv({
               path: path.resolve(__dirname, '../.env')
          })
          break
     default:
          throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled`);
}




export const sequelize = new Sequelize(
     process.env.DB_NAME||'',
     process.env.DB_USERNAME||'',
     process.env.DB_PASSWORD||'',
     {
          host: process.env.DB_HOST ?? 'localhost',
          dialect: 'mysql'
     }
)
const sqlPath = path.resolve(__dirname, '../bincom_test.sql');
const imp = new importer({
     host: process.env.DB_HOST || '',
     user: process.env.DB_USERNAME || '',
     password: process.env.DB_PASSWORD || '',
     database: process.env.DB_NAME||''
});

(async () => {
     try {
          await imp.import(sqlPath)
          const sqlDump = imp.getImported();

          console.log(sqlDump, "------------------------------------ sqldump");
          /*let queryString = await readAFile(sqlPath);
          queryString = queryString.replace(/(--\\n||\+||\\n)/g, '');*/
          //sequelize.query("", { type: QueryTypes.RAW })
          console.log("success connecting to the db")
     }
     catch (err) {
          console.log(err, "an error")
     }
})();



