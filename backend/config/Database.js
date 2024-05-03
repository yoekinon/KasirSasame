import { Sequelize } from "sequelize";

const db = new Sequelize('kasirV2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;