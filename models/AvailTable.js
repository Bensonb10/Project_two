module.exports = function(sequelize, DataTypes) {
	var AvailTable = sequelize.define('AvailTable', {
		date: DataTypes.DATEONLY,
		startTime: DataTypes.TIME,
		endTime: DataTypes.TIME,
		avail: DataTypes.BOOLEAN
	});
	// AvailTable.associate = function(models) {
	// 	AvailTable.belongsTo(models.EmployeeTable, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
	// };
	return AvailTable;
};