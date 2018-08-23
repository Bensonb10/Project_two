USE scheduler;

INSERT INTO EmployeeTables(firstName, lastName, isAdmin, email, phone, picture, password, googleId) VALUES 
('David', 'Tran', false, 'dhtran@hotmail.com', '832-277-5000', null, '$2a$10$FsRJsre/0AXezlGkQRH84eswh/4bXmFrvGUQHlH.QF6ia6BXQRodq', null),
('Michael', 'Pushkin', true, 'michaelpushkin@gmail.com', '713-457-8465', null, '$2a$10$mutRFkFHAIXjxZMxzGcxHOsmsEDKFgYxyb4nUapzsYc67JVL2CPBy', null),
('Robin', 'Zhao', true, 'zhaorobin@gmail.com', '281-456-1873', null, '$2a$10$l337eDANev4CXcX4rqEVJeQJjopOvmZCyt5VgtOnLsz2L6FFNwfs6', null),
('Stephen', 'Bomans', true, 'bomansstephen@gmail.com', '832-456-1234', null, '$2a$10$JCQ9yqQdKpIxaN9LFwA3KOaYcUreeV2Sb6JiTTFwTL7ulzZNKDuOi', null),
('Mohammed', 'Chawla', true, 'chawlamohammed@gmail.com', '281-789-8546', null, '$2a$10$Xo4le9ZuWNtZsZ3XGEe6ve2URrFNwZIM6cXQEkJ1S8SgSbH1cHQLS', null),
('Benjamin', 'Benson', true, 'benbenson@google.com', '832-847-8452', null, '$2a$10$8O2RpZX2rnpX80irVZpJRO4Iz7tTCNFxGYWJecs4O4hYJWIy.iguW', null
);


INSERT INTO AvailTables(dayOfWeek, startTime, endTime, avail, EmployeeTableId) VALUES 
("Monday", "09:00", "12:00", true, "1"), 
("Tuesday", "12:00", "15:00", true, "2"), 
("Wednesday", "16:00", "20:00", true, "3"),
("Thursday", null, null, false, "4"),
("Friday", null, null, false, "5"),
("Saturday", null, null, false, "6"),
("Sunday", null, null, false, "1"),
("Monday", "12:00", "21:00", true, "2"),
("Tuesday", null, null, false, "3"),
("Wednesday", null, null, false, "4"),
("Thursday", null, null, false, "5"),
("Friday", "09:00", "13:00", true, "6");

INSERT INTO ScheduleTables(date, dayOfWeek, start, end, EmployeeTableId) VALUES
("2018-08-27", "Monday", "09:00" , "16:00", 1), 
("2018-08-27", "Monday", "12:00" , "15:00", 2), 
("2018-08-27", "Monday", "16:00" , "21:00", 3),
("2018-08-27", "Monday", "09:00" , "16:00", 4), 
("2018-08-27", "Monday", "12:00" , "15:00", 5), 
("2018-08-27", "Monday", "16:00" , "21:00", 6),
("2018-08-28", "Tuesday", "12:00" , "21:00", 1), 
("2018-08-28", "Tuesday", "09:00", "16:00", 2),
("2018-08-28", "Tuesday", "16:00" , "21:00", 3),
("2018-08-28", "Tuesday", "12:00" , "21:00", 4), 
("2018-08-28", "Tuesday", "09:00", "16:00", 5),
("2018-08-28", "Tuesday", "16:00" , "21:00", 6),
("2018-08-29", "Wednesday", "09:00" , "16:00", 1), 
("2018-08-29", "Wednesday", "12:00" , "15:00", 2), 
("2018-08-29", "Wednesday", "16:00" , "21:00", 3),
("2018-08-29", "Wednesday", "09:00" , "16:00", 4), 
("2018-08-29", "Wednesday", "12:00" , "15:00", 5), 
("2018-08-29", "Wednesday", "16:00" , "21:00", 6),
("2018-08-30", "Thursday", "09:00" , "16:00", 1), 
("2018-08-30", "Thursday", "12:00" , "15:00", 2), 
("2018-08-30", "Thursday", "16:00" , "21:00", 3),
("2018-08-30", "Thursday", "09:00" , "16:00", 4), 
("2018-08-30", "Thursday", "12:00" , "15:00", 5), 
("2018-08-30", "Thursday", "16:00" , "21:00", 6),
("2018-08-31", "Friday", "09:00" , "16:00", 1), 
("2018-08-31", "Friday", "12:00" , "15:00", 2), 
("2018-08-31", "Friday", "16:00" , "21:00", 3),
("2018-08-31", "Friday", "09:00" , "16:00", 4), 
("2018-08-31", "Friday", "12:00" , "15:00", 5), 
("2018-08-31", "Friday", "16:00" , "21:00", 6); 
