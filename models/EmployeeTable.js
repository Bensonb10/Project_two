module.exports = function(sequelize, DataTypes) {
	var EmployeeTable = sequelize.define('EmployeeTable', {

		name: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN,
		email: DataTypes.STRING,
		phone: DataTypes.STRING,
		picture: DataTypes.STRING

	});
  
	EmployeeTable.associate = function(models) {
		EmployeeTable.hasMany(models.AvailTable, {
			foreignKey: 'EmployeeTableId', sourceKey: 'AvailTableId'
		});
		EmployeeTable.hasMany(models.ScheduleTable, {
			foreignKey: 'EmployeeTableId', sourceKey: 'ScheduleTableId'
		});
	};
	return EmployeeTable;
};
