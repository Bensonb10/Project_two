module.exports = function(sequelize, DataTypes) {
	var EmployeeTable = sequelize.define('EmployeeTable', {

		firstName: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		lastName: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: {
					msg: 'Not Valid Email'
				},
				notEmpty: true
			}
		},
		phone: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		picture: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
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

	EmployeeTable.sync();

	return EmployeeTable;
};
