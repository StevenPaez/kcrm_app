import sequelize from "../../database";
import { DataTypes } from "sequelize";

const Role = Sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rone_name: {
        type: DataTypes.ENUM('Administrator', 'Advisor'),
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;