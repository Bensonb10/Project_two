var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
	var EmployeeTable = sequelize.define('EmployeeTable', {

		name: DataTypes.STRING,
		isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false},
		email: DataTypes.STRING,
		phone: DataTypes.STRING,
		picture: DataTypes.STRING,
		password: DataTypes.STRING

	});
  
	// EmployeeTable.associate = function(models) {
	// 	EmployeeTable.hasMany(models.AvailTable, {
	// 		foreignKey: 'EmployeeTableId', sourceKey: 'AvailTableId'
	// 	});
	// 	EmployeeTable.hasMany(models.ScheduleTable, {
	// 		foreignKey: 'EmployeeTableId', sourceKey: 'ScheduleTableId'
	// 	});
	// };
	return EmployeeTable;
};

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	EmployeeTable.findOne({where: query}, callback);
}

module.exports.getUserById = function(id, callback){
	EmployeeTable.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}