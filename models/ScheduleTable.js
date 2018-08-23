module.exports = function (sequelize, DataTypes) {
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
		}
	}, {
			timestamps: false
		});
	ScheduleTable.associate = function (models) {
		ScheduleTable.belongsTo(models.EmployeeTable, {
			// foreignKey: {
			// 	allowNull: false
			// }
		});
	};
	return ScheduleTable;
};