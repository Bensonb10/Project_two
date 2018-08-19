module.exports = function(sequelize, DataTypes) {
	var EmployeeTable = sequelize.define('EmployeeTable', {

		firstName: {
			type: DataTypes.STRING
		},
		lastName: {
			type: DataTypes.STRING
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		email: {
			type: DataTypes.STRING
		},
		phone: {
			type: DataTypes.STRING
		},
		picture: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		googleId: {
			type: DataTypes.STRING,
			defaultValue: null
		}

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
