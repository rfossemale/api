import User from 'src/models/User';
import Company from 'src/models/Company';
import File from 'src/models/File';
import Operator from 'src/models/Operator';
import Ticket from 'src/models/Ticket';
import * as dotenv from 'dotenv';
dotenv.config();

const models = [Company, User, Ticket, Operator, File];

const sequelizeConfig: object = {
  dialect: 'mysql',
  host: process.env.DB_HOST, // add to .env file
  port: 3306, // port must be the docker internal port ( communicate with the net )
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models,
  autoLoadModels: true,
  synchronize: true,
};

export default { sequelizeConfig, models };
