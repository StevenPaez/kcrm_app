import { DataTypes } from "sequelize";
import sequelize from "../../database";

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
            model: 'users',
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
            model: 'users',
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
    timestamps: true
});

module.exports = Sale;