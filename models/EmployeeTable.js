module.exports = function(sequelize, DataTypes) {
	var EmployeeTable = sequelize.define('EmployeeTable', {

		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN,
		email: DataTypes.STRING,
		phone: DataTypes.STRING,
		picture: DataTypes.STRING

	});
  
	EmployeeTable.associate = function(models) {
		EmployeeTable.hasMany(models.AvailTable, {
			foreignKey: 'EmployeeTableId',// sourceKey: 'id', 
			onDelete: 'cascade'
		});
		EmployeeTable.hasMany(models.ScheduleTable, {
			foreignKey: 'EmployeeTableId',// sourceKey: 'id',
			onDelete: 'cascade'
		});
	};
	return EmployeeTable;
};
