import sequelize from "../../database.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.ENUM('Administrator', 'Advisor'),
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

export default Role;