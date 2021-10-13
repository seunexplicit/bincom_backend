import { Sequelize } from 'sequelize';
import { DataTypes, Model } from 'sequelize';

class AgentName extends Model {
}
class AnnouncedLgaResults extends Model { }
class announced_pu_results extends Model { }


export const initialize = (sequelize: Sequelize) => {
     AgentName.init({
          name_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true
          },
          firstname: {
               type: DataTypes.STRING,
               allowNull: false
          },
          lastname: {
               type: DataTypes.STRING,
               allowNull: false
          },
          email: {
               type: DataTypes.STRING,
          },
          phone: {
               type: DataTypes.CHAR(13),
               allowNull: false
          },
          pollingunit_uniqueid: {
               type: DataTypes.INTEGER,

          }
     }, {
          sequelize,
          modelName: 'agentname'
     });
     AnnouncedLgaResults.init({
     }, {
          sequelize,
          modelName: "announced_lga_results"
     });

}