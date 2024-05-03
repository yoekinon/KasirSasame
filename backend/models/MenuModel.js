import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define('users', {
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
},{
    freezeTableName: true
});

export default User;

(async () => {
    await db.sync();
})();