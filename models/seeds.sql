USE scheduler;

INSERT INTO EmployeeTables(firstName, lastName, isAdmin, email, phone, picture, password, googleId) VALUES 
('David', 'Tran', false, 'dhtran@hotmail.com', '832-277-5000', null, '$2a$10$FsRJsre/0AXezlGkQRH84eswh/4bXmFrvGUQHlH.QF6ia6BXQRodq', null),
('Michael', 'Pushkin', true, 'michaelpushkin@gmail.com', '713-457-8465', null, '$2a$10$mutRFkFHAIXjxZMxzGcxHOsmsEDKFgYxyb4nUapzsYc67JVL2CPBy', null),
('Robin', 'Zhao', true, 'zhaorobin@gmail.com', '281-456-1873', null, '$2a$10$l337eDANev4CXcX4rqEVJeQJjopOvmZCyt5VgtOnLsz2L6FFNwfs6', null),
('Stephen', 'Bomans', true, 'bomansstephen@gmail.com', '832-456-1234', null, '$2a$10$JCQ9yqQdKpIxaN9LFwA3KOaYcUreeV2Sb6JiTTFwTL7ulzZNKDuOi', null),
('Mohammed', 'Chawla', true, 'chawlamohammed@gmail.com', '281-789-8546', null, '$2a$10$Xo4le9ZuWNtZsZ3XGEe6ve2URrFNwZIM6cXQEkJ1S8SgSbH1cHQLS', null),
('Benjamin', 'Benson', true, 'benbenson@google.com', '832-847-8452', null, '$2a$10$8O2RpZX2rnpX80irVZpJRO4Iz7tTCNFxGYWJecs4O4hYJWIy.iguW', null
);


INSERT INTO AvailTables(date, startTime, endTime, avail, EmployeeTableId) VALUES 
("2018-08-20", "09:00", "12:00", true, "1"), 
("2018-08-20", "12:00", "15:00", true, "2"), 
("2018-08-20", "16:00", "20:00", true, "3"),
("2018-08-20", null, null, false, "4"),
("2018-08-20", null, null, false, "5"),
("2018-08-20", null, null, false, "6"),
("2018-08-21", null, null, false, "1"),
("2018-08-21", "12:00", "21:00", true, "2"),
("2018-08-21", null, null, false, "3"),
("2018-08-21", null, null, false, "4"),
("2018-08-21", null, null, false, "5"),
("2018-08-21", "09:00", "13:00", true, "6");

INSERT INTO ScheduleTables(date, dayOfWeek, start, end, EmployeeTableId) VALUES
("2018-08-20", "Monday", "09:00" , "16:00", null), 
("2018-08-20", "Tuesday", "12:00" , "15:00", null), 
("2018-08-20", "wednesday", "16:00" , "20:00", null), 
("2018-08-21", "Thursday", "12:00" , "21:00", null), 
("2018-08-21", "Friday", "09:00", "14:00" ,null); 
