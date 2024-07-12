Notes To Start Up:

from "backend" folder, run `go run main.go serve` and wait

List Of All Available Subjects:
- Math
- Physics
- Psychology
- English
- Physical Education
- History

Currently Available Semesters:
- Summer-2024
- Fall-2024
- Spring-2025

CREATE TABLE students (
	ID SERIAL PRIMARY KEY,
	studentId VARCHAR(30),
	fullName VARCHAR(30),
	major VARCHAR(30),
	gradDate VARCHAR(30),
	classesEnrolled
);

CREATE TABLE classes (
	id SERIAL PRIMARY KEY,
	classId VARCHAR(10),
	name text,
	subject text,
	maxStudents int,
	semester text,
	studentsEnrolled integer
);


const rows = [
  { 
  id: 1, 
  classId: 1,
	name: 'General Physics 101', 
	maxstudents: 35, 
	semester: 'Summer-2024',
	studentsenrolled: 0,
	subject: 'Physics',
	
  },
];