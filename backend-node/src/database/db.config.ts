import { Dialect, Sequelize } from 'sequelize'

let sequelizeConnection: any;
const dbName = process.env.DB_NAME as string || 'portalsc';
const dbUser = process.env.DB_USER as string || 'root';
const dbHost = process.env.DB_HOST || 'localhost';
const dbDriver = process.env.DB_DRIVER as Dialect || 'mysql';
const dbPassword = process.env.DB_PASS || '';

try {
  sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
  })
} catch (e) {
  console.log(e)
}


export default sequelizeConnection;