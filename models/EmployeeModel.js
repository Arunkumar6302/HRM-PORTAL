const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Employee = sequelize.define('Employee', {
    employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    department_id: {
        type: DataTypes.INTEGER, // References Department
        allowNull: true
    },
    designation_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    manager_id: {
        type: DataTypes.INTEGER, // References Employee
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'OnLeave', 'Resigned'),
        defaultValue: 'Active'
    }
}, {
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Employee;
