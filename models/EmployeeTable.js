module.exports = function(sequelize, DataTypes) {
	var EmployeeTable = sequelize.define('EmployeeTable', {

		name: DataTypes.STRING,
		isAdmin: DataTypes.BOOLEAN,
		email: DataTypes.STRING,
		phone: DataTypes.STRING,
		picture: DataTypes.STRING

	});
	return EmployeeTable;
};
