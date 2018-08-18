module.exports = function(sequelize, DataTypes) {
	var ScheduleTable = sequelize.define('ScheduleTable', {
		date: DataTypes.STRING,
		start: DataTypes.STRING,
		end: DataTypes.STRING
	});
	ScheduleTable.associate = function(models) {
		ScheduleTable.belongsTo(models.EmployeeTable, {
			// foreignKey: {
			// 	allowNull: false
			// }
		});
	};
	return ScheduleTable;
};