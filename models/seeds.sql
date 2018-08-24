USE scheduler;

INSERT INTO EmployeeTables(firstName, lastName, isAdmin, email, phone, picture, password, googleId) VALUES 
('Admin', 'Open', true, 'Admin@scheduler.com', 'N/A', null, '$2a$10$nCy7wVTG1XpIJlykHpxoNOkxMAfijGUmu98cBnD3MPiGCldYznjoW', null),
('David', 'Tran', false, 'dhtran@hotmail.com', '832-277-5000', null, '$2a$10$FsRJsre/0AXezlGkQRH84eswh/4bXmFrvGUQHlH.QF6ia6BXQRodq', null),
('Michael', 'Pushkin', true, 'michaelpushkin@gmail.com', '713-457-8465', null, '$2a$10$mutRFkFHAIXjxZMxzGcxHOsmsEDKFgYxyb4nUapzsYc67JVL2CPBy', null),
('Robin', 'Zhao', true, 'zhaorobin@gmail.com', '281-456-1873', null, '$2a$10$l337eDANev4CXcX4rqEVJeQJjopOvmZCyt5VgtOnLsz2L6FFNwfs6', null),
('Stephen', 'Bomans', true, 'bomansstephen@gmail.com', '832-456-1234', null, '$2a$10$JCQ9yqQdKpIxaN9LFwA3KOaYcUreeV2Sb6JiTTFwTL7ulzZNKDuOi', null),
('Mohammed', 'Chawla', true, 'chawlamohammed@gmail.com', '281-789-8546', null, '$2a$10$Xo4le9ZuWNtZsZ3XGEe6ve2URrFNwZIM6cXQEkJ1S8SgSbH1cHQLS', null),
('Benjamin', 'Benson', true, 'benbenson@google.com', '832-847-8452', null, '$2a$10$8O2RpZX2rnpX80irVZpJRO4Iz7tTCNFxGYWJecs4O4hYJWIy.iguW', null
);


INSERT INTO AvailTables(date, dayOfWeek, startTime, endTime, avail, EmployeeTableId) VALUES 
(null, "Monday", "09:00", "12:00", false, "1"), 
(null, "Tuesday", "12:00", "15:00", false, "2"), 
(null, "Wednesday", "16:00", "20:00", false, "3"),
(null, "Thursday", null, null, true, "4"),
(null, "Friday", null, null, true, "5"),
(null, "Saturday", null, null, true, "6"),
(null, "Sunday", null, null, true, "1"),
(null, "Monday", "12:00", "21:00", false, "2"),
(null, "Tuesday", null, null, true, "3"),
(null, "Wednesday", null, null, true, "4"),
(null, "Thursday", null, null, true, "5"),
(null, "Friday", "09:00", "13:00", false, "6");

INSERT INTO ScheduleTables(date, dayOfWeek, start, end, EmployeeTableId) VALUES
("2018-08-27", "Monday", "09:00" , "16:00", 1),
-- ("2018-08-27", "Monday", "12:00" , "15:00", 1),
-- ("2018-08-27", "Monday", "16:00" , "21:00", 1),
("2018-08-28", "Tuesday", "09:00" , "16:00", 1),
-- ("2018-08-28", "Tuesday", "12:00", "15:00", 1),
-- ("2018-08-28", "Tuesday", "16:00" , "21:00", 1),
("2018-08-29", "Wednesday", "09:00" , "16:00", 1),
-- ("2018-08-29", "Wednesday", "12:00" , "15:00", 1),
-- ("2018-08-29", "Wednesday", "16:00" , "21:00", 1),
("2018-08-30", "Thursday", "09:00" , "16:00", 1),
-- ("2018-08-30", "Thursday", "12:00" , "15:00", 1),
-- ("2018-08-30", "Thursday", "16:00" , "21:00", 1),
("2018-08-31", "Friday", "09:00" , "16:00", 1);
-- ("2018-08-31", "Friday", "12:00" , "15:00", 1), 
-- ("2018-08-31", "Friday", "16:00" , "21:00", 1);

