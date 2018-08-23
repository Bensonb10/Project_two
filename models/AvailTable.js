module.exports = function(sequelize, DataTypes) {
	var AvailTable = sequelize.define('AvailTable', {
		dayOfWeek: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		startTime: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		endTime: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		avail: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
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