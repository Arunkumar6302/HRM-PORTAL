// Import all existing models
const SuperAdmin = require('./SuperAdmin');
const Company = require('./Company');
const EmailQuery = require('./EmailQuery');
const OfflineRequest = require('./OfflineRequest');
const { HeaderSetting, WebsiteSetting, AboutSetting, ContactSetting, Feature, Pricing } = require('./Settings');
const Subscription = require('./Subscription');
const Transaction = require('./Transaction');

// Import Manager Panel Models
const Department = require('./DepartmentModel');
const Employee = require('./EmployeeModel');
const Attendance = require('./AttendanceModel');
const Leave = require('./LeaveModel');
const Asset = require('./AssetModel');
const Payroll = require('./PayrollModel');
const Expense = require('./ExpenseModel');

// Define Associations here if necessary
// e.g.
Employee.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(Employee, { foreignKey: 'department_id' });

Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'manager_id' });

Attendance.belongsTo(Employee, { foreignKey: 'employee_id' });
Employee.hasMany(Attendance, { foreignKey: 'employee_id' });

Leave.belongsTo(Employee, { foreignKey: 'employee_id' });
Employee.hasMany(Leave, { foreignKey: 'employee_id' });

Asset.belongsTo(Employee, { foreignKey: 'assigned_employee' });
Employee.hasMany(Asset, { foreignKey: 'assigned_employee' });

Payroll.belongsTo(Employee, { foreignKey: 'employee_id' });
Employee.hasMany(Payroll, { foreignKey: 'employee_id' });

Expense.belongsTo(Employee, { foreignKey: 'employee_id' });
Employee.hasMany(Expense, { foreignKey: 'employee_id' });

module.exports = {
    SuperAdmin, Company, EmailQuery, OfflineRequest, HeaderSetting, WebsiteSetting, AboutSetting, ContactSetting, Feature, Pricing, Subscription, Transaction,
    Department, Employee, Attendance, Leave, Asset, Payroll, Expense
};
