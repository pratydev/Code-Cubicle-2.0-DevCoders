import { useState, useEffect } from 'react';
import './studentsStatus.css';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const StudentsStatus = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const teacherId = 1; // Assume logged-in teacher ID is 1

  // Demo data
  const data = {
    students: [
      { id: 1, name: "jaitn", math: 40, english: 86, science: 76, roll: 101, email: "student1@example.com", class: "A", teacher: 1 },
      { id: 2, name: "Student 2", math: 60, english: 76, science: 89, roll: 102, email: "student2@example.com", class: "A", teacher: 1 },
      { id: 3, name: "Student 3", math: 10, english: 73, science: 73, roll: 103, email: "student3@example.com", class: "A", teacher: 1 },
      { id: 4, name: "Student 4", math: 70, english: 76, science: 81, roll: 104, email: "student4@example.com", class: "A", teacher: 1 },
      { id: 5, name: "Student 5", math: 46, english: 81, science: 86, roll: 105, email: "student5@example.com", class: "A", teacher: 1 },
      { id: 6, name: "Student 6", math: 90, english: 86, science: 76, roll: 106, email: "student6@example.com", class: "A", teacher: 1 },
      { id: 7, name: "Student 7", math: 49, english: 76, science: 89, roll: 107, email: "student7@example.com", class: "A", teacher: 1 },
      { id: 8, name: "Student 8", math: 76, english: 73, science: 33, roll: 108, email: "student8@example.com", class: "A", teacher: 1 },
      { id: 9, name: "Student 9", math: 47, english: 33, science: 89, roll: 109, email: "student9@example.com", class: "A", teacher: 1 },
      { id: 10, name: "Student 10", math: 81, english: 86, science: 89, roll: 110, email: "student10@example.com", class: "A", teacher: 1 },
      { id: 11, name: "Student 11", math: 40, english: 66, science: 81, roll: 111, email: "student11@example.com", class: "B", teacher: 1 },
      { id: 12, name: "Student 12", math: 40, english: 86, science: 33, roll: 112, email: "student12@example.com", class: "B", teacher: 1 },
      { id: 13, name: "Student 13", math: 76, english: 33, science: 76, roll: 113, email: "student13@example.com", class: "B", teacher: 1 },
      { id: 14, name: "Student 14", math: 40, english: 86, science: 89, roll: 114, email: "student14@example.com", class: "B", teacher: 1 },
      { id: 15, name: "Student 15", math: 33, english: 81, science: 73, roll: 115, email: "student15@example.com", class: "B", teacher: 1 },
      { id: 16, name: "Student 16", math: 73, english: 73, science: 89, roll: 116, email: "student16@example.com", class: "B", teacher: 1 },
      { id: 17, name: "jaitn", math: 40, english: 66, science: 89, roll: 117, email: "student17@example.com", class: "B", teacher: 1 },
      { id: 18, name: "Student 18", math: 40, english: 66, science: 89, roll: 118, email: "student18@example.com", class: "B", teacher: 1 },
      { id: 19, name: "Student 19", math: 40, english: 66, science: 89, roll: 119, email: "student19@example.com", class: "B", teacher: 1 },
      { id: 20, name: "Student 20", math: 40, english: 66, science: 89, roll: 120, email: "student20@example.com", class: "B", teacher: 1 }
    ]
  };

  useEffect(() => {
    // Filter students by the teacher ID
    const teacherStudents = data.students.filter(student => student.teacher === teacherId);
    setStudents(teacherStudents);
  }, [teacherId]);

  return (
    <div className="app">
      <div className="sidebar card-help">
        <h2>Students</h2>
        <ul>
          {students.map(student => (
            <li key={student.id} onClick={() => setSelectedStudent(student)}>
              Name : {student.name} <br />
              Roll No. {student.roll}
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        {selectedStudent ? (
          <div className='card-help'>
            <h2>{selectedStudent.name}</h2>
            {/* <p>Roll: {selectedStudent.roll}</p>
            <p>Email: {selectedStudent.email}</p>
            <p>Class: {selectedStudent.class}</p> */}
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Math', 'English', 'Science'] }]}
              series={[{ data: [selectedStudnt.math, selectedStudent.english, selectedStudent.science] }]}
              width={400}
              height={300}
            />
          </div>
        ) : (
          <p>Select a student to see their details</p>
        )}
      </div>
    </div>
  );
}

export default StudentsStatus;
