import express from 'express';
import { Sequelize } from 'sequelize/types';
import { PollingResultService } from './polling_result.service';
export class PollingResultRoute {

     private service: PollingResultService;

     constructor(
          private app: express.Application,
          private sequelize: Sequelize,
           
     ) {
          this.service = new PollingResultService(sequelize);
          this.configureRoutes();
     }

     configureRoutes() {
       
          this.app
               .get('/polling-result', this.service.getAnnouncedPollingResult)
               .get('/lga-result', this.service.getLGAResults)
               .get('/pollingunit', this.service.getPollingUnit)
               .get('/lga', this.service.getLGA)
               .get('/state', this.service.getStates)
               .get('/ward', this.service.getWard)
               .post('/result', this.service.postResult)
               .get('/parties', this.service.getParty)
          return this.app;
     }
}