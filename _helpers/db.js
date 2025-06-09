const config = require('../config.js');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;

  try {
    // Connect to MySQL and create DB if not exists
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log(`✔️  Database '${database}' verified or created`);

    // Connect Sequelize to the DB
    const sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'mysql',
      logging: false,
    });

    // Initialize models
    db.User = require('../users/user.model')(sequelize);

    // Sync models
    await sequelize.sync({ alter: true });
    console.log('✔️  Sequelize models synced successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    process.exit(1); // Exit early if DB setup fails
  }
}
