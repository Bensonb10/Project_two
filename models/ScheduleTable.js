module.exports = function(sequelize, DataTypes) {
	var ScheduleTable = sequelize.define('ScheduleTable', {
		date: DataTypes.DATEONLY,
		start: DataTypes.TIME,
		end: DataTypes.TIME
	});
	ScheduleTable.associate = function(models) {
		ScheduleTable.belongsTo(models.EmployeeTable, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	return ScheduleTable;
};