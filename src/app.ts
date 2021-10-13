import { sequelize } from './config';
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import { PollingResultRoute } from './polling result/polling_result.route';


const app: express.Application = express();
app.use(cors());
app.use(express.json())
const server: http.Server = http.createServer(app);


const appRoute: PollingResultRoute = new PollingResultRoute(app, sequelize)

server.listen(process.env.PORT || '4000', () => {
     console.log(`server listening to port ${process.env.PORT || '4000'}`);
})