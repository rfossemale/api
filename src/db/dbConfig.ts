import { User } from '../models/User';

const models = [User];

const sequelizeConfig: object = {
  dialect: 'mysql',
  host: 'mysqldb', // add to .env file
  port: 3306, // port must be the docker internal port ( communicate with the net )
  username: 'root',
  password: 'admin',
  database: 'mysql_full-app',
  models,
  autoLoadModels: true,
  synchronize: true,
};

export default { sequelizeConfig, models };
