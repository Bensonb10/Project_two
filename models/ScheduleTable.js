module.exports = function(sequelize, DataTypes) {
	var ScheduleTable = sequelize.define('ScheduleTable', {
		date: {
			type: DataTypes.STRING,
			validate: {
				isDate: {
					msg: 'YYYY-MM-DD'
				},
				notEmpty: true
			}
		},
		dayOfWeek: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		start: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		end: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
		},
		shiftAvail: {
			type: DataTypes.BOOLEAN,
			defaultValue: '1'

		}
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