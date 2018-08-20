USE scheduler;

-- The password has to be a hash to log in
-- INSERT INTO EmployeeTables(firstName, lastName, isAdmin, email, phone, picture, password, googleId) VALUES 
-- ('David', 'Tran', false, 'dhtran@hotmail.com', '8322775000', null, "tran", null),
-- ('Michael', 'Pushkin', true, 'michaelpushkin@google.com', '7134578465', null, "push", null),
-- ('Robin', 'Zhao', true, 'zhaorobin@google.com', '2814561873', null, "zhao", null),
-- ('Stephen', 'Bomans', true, 'bomansstephen@google.com', '8324561234', null, "bomans", null),
-- ('Mohammed', 'Chawla', true, 'chawlamohammed@google.com', '2817898546', null, "chawla", null),
-- ('Benjamin', 'Benson', true, 'bensonbenjamin@google.com', '8328478452', null, "benson", null);

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
