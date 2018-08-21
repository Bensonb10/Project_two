USE scheduler;

INSERT INTO EmployeeTables(firstName, lastName, isAdmin, email, phone, picture, password, googleId) VALUES 
('David', 'Tran', false, 'dhtran@hotmail.com', '832-277-5000', null, '$2a$10$FsRJsre/0AXezlGkQRH84eswh/4bXmFrvGUQHlH.QF6ia6BXQRodq', null),
('Michael', 'Pushkin', true, 'michaelpushkin@gmail.com', '713-457-8465', null, '$2a$10$mutRFkFHAIXjxZMxzGcxHOsmsEDKFgYxyb4nUapzsYc67JVL2CPBy', null),
('Robin', 'Zhao', true, 'zhaorobin@gmail.com', '281-456-1873', null, '$2a$10$l337eDANev4CXcX4rqEVJeQJjopOvmZCyt5VgtOnLsz2L6FFNwfs6', null),
('Stephen', 'Bomans', true, 'bomansstephen@gmail.com', '832-456-1234', null, '$2a$10$JCQ9yqQdKpIxaN9LFwA3KOaYcUreeV2Sb6JiTTFwTL7ulzZNKDuOi', null),
('Mohammed', 'Chawla', true, 'chawlamohammed@gmail.com', '281-789-8546', null, '$2a$10$Xo4le9ZuWNtZsZ3XGEe6ve2URrFNwZIM6cXQEkJ1S8SgSbH1cHQLS', null),
('Benjamin', 'Benson', true, 'bensonbenjamin@gmail.com', '832-847-8452', null, '$2a$10$8O2RpZX2rnpX80irVZpJRO4Iz7tTCNFxGYWJecs4O4hYJWIy.iguW', null);

INSERT INTO AvailTables(date, startTime, endTime, avail, EmployeeTableId) VALUES 
("08202018", "0900", "1200", true, "1"), 
("08202018", "1200", "1500", true, "2"), 
("08202018", "1600", "2000", true, "3"),
("08202018", null, null, false, "4"),
("08202018", null, null, false, "5"),
("08202018", null, null, false, "6"),
("08212018", null, null, false, "1"),
("08212018", "1200", "2100", true, "2"),
("08212018", null, null, false, "3"),
("08212018", null, null, false, "4"),
("08212018", null, null, false, "5"),
("08212018", "0900", "1300", true, "6");

INSERT INTO ScheduleTables(date, start, end, EmployeeTableId) VALUES
("08202018", "0900" , "1600", null), 
("08202018", "1200" , "1500", null), 
("08202018", "1600" , "2000", null), 
("08212018", "1200" , "2100", null), 
("08212018", "0900" , "1200", null); 
