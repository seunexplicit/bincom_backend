import { NextFunction, Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize/types";

var _sequelize: Sequelize;

export class PollingResultService{
     //public sequelize: Sequelize
     constructor(private sequelize: Sequelize) {
          //console.log(sequelize, "----------------------------");
          _sequelize = this.sequelize
     }

     async postResult(req: Request, res: Response, next: NextFunction) {
          try {
               const { body, ip } = req;
               let pollingResult = '';
               (body.results as Array<any>).forEach((values, index, _array) => {
                    let result_date = new Date().toISOString();
                    result_date = result_date.replace(/T/g, ' ');
                    result_date = result_date.replace(/\..*/, '');
                   
                         pollingResult += `(${values.polling_unit_uniqueid}, '${values.party_abbreviation}', ${values.party_score}, '${values.entered_by_user}', '${result_date}', '${ip}')${index + 1 != _array.length ? ',' : ';'}`;
               })
               const sqlQuery = `INSERT INTO announced_pu_results 
                         (polling_unit_uniqueid, party_abbreviation, party_score, entered_by_user, date_entered, user_ip_address)
                          VALUES ${pollingResult}`

               console.log(sqlQuery);
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.INSERT,  });
               res.status(200).send({ status: true, message: 'success', data: result });

          }
          catch(err) {
               next(err)
          }
     }

     async getStates(req: Request, res: Response, next: NextFunction) {
          try {
               const sqlQuery = `SELECT * FROM states`;
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
               res.status(200).send({ status: true, message: 'success', data: result })
          }
          catch (err) {
               next(err)
          }
     }

     async getLGA(req: Request, res: Response, next: NextFunction) {
          try {

               const { query } = req;
               const sqlQuery = `SELECT * FROM lga WHERE state_id${query.state_id ? '=' + query.state_id:' IS NOT NULL'} `;
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
               res.status(200).send({ status: true, message: 'success', data: result })
          }
          catch (err) {
               next(err)
          }
     }

     async getWard(req: Request, res: Response, next: NextFunction) {
          try {
               const { query } = req;
               const sqlQuery = `SELECT * FROM ward WHERE lga_id${query.lga_id ? '=' + query.lga_id : ' IS NOT NULL'} `;
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
               res.status(200).send({ status: true, message: 'success', data: result })
          }
          catch (err) {
               next(err)
          }
     }

     async getParty(req: Request, res: Response, next: NextFunction) {
          try {
               const sqlQuery = `SELECT * FROM party`;
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
               res.status(200).send({ status: true, message: 'success', data: result })
          }
          catch (err) {
               next(err);
          }
     }

     async getPollingUnit(req: Request, res: Response, next: NextFunction) {
          try {
               const { query } = req;
               const sqlQuery = `SELECT * FROM polling_unit WHERE lga_id${query.lga_id ? '=' + query.lga_id : ' IS NOT NULL'} 
                                   AND ward_id${query.ward_id ? '=' + query.ward_id : ' IS NOT NULL'}`;
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
               res.status(200).send({ status: true, message: 'success', data: result })
          }
          catch (err) {
               next(err)
          }
     }

     async getAnnouncedLGAResult(req: Request, res: Response, next: NextFunction) {
          try {
               const { query } = req;
               const sqlQuery = `SELECT * FROM announced_lga_results WHERE lga_name${query.lga_name ? '=' + query.lga_name : ' IS NOT NULL'}`
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
               res.status(200).send({ status: true, message: 'success', data: result })

          }
          catch (err) {
               next(err)
          }
     }

     async getAnnouncedPollingResult(req: Request, res: Response, next: NextFunction) {
          try {
               const { query } = req;
               const sqlQuery = `SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid${query.polling_unit_uniqueid ? '=' + query.polling_unit_uniqueid : ' IS NOT NULL'}`
               const result = await _sequelize.query(sqlQuery, { type: QueryTypes.SELECT });
               res.status(200).send({ status: true, message: 'success', data: result })

          }
          catch (err) {
               next(err)
          }
     }
}