import { DataTypes } from "sequelize";
import sequelize from "../../database.js";
import User from "./user.model.js";

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product: {
        type: DataTypes.ENUM('Consumer Credit', 'Payroll Loan', 'Credit Card'),
        allowNull: false
    },
    requested_amount: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    franchise: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    rate: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'sales',
    timestamps: false
});

Sale.belongsTo(User, { foreignKey: 'created_by', as: 'created_user' });
Sale.belongsTo(User, { foreignKey: 'updated_by', as: 'updated_user' });

export default Sale;