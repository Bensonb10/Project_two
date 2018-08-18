module.exports = function(sequelize, DataTypes) {
	var AvailTable = sequelize.define('AvailTable', {
		date: DataTypes.STRING,
		startTime: DataTypes.STRING,
		endTime: DataTypes.STRING,
		avail: DataTypes.BOOLEAN
	});
	AvailTable.associate = function(models) {
		AvailTable.belongsTo(models.EmployeeTable, {
			// foreignKey: {
			// 	allowNull: false
			// }
		});
	};
	return AvailTable;
};