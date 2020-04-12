
Backend Endpoints

| Type        | URL         | Returns  | Description |
| ----------- | ----------- | ----------- | ----------- |
| GET | .../students? | Array<Student> | Get all students that match the query parameters |
| GET | .../students/ | Array<Student> | Get all students |
| POST | .../students/ |  | Create a new student |
| PUT | .../students/{nuid} |  | Update student with given NUID |
| GET | .../students/cohort/{cohort} | Array<Student> | Get all students in given cohort |
| GET | .../students/f1 | Array<Student> | Get all international students |
| GET | .../students/name/{firstName}-{lastName} | Student | Get student with given first and last name |
| GET | .../students/{nuid} | Student | Get student with given NUID |
| GET | .../students/{nuid}/courses | Array<Course> | Get all of a student's courses|
| GET | .../students/{nuid}/courses/{courseID} | StudentCourse | Get a student's instance of a course |
| GET | .../students/{nuid}/courses/terms/{term} | Array<StudentCourse> | Get all of a student's course instances in a term |
| GET | .../students/{nuid}/courses/{courseID}/assessments | Array<StudentAssessment> | Get all student's assessment instances from a course |
| GET | .../students/{nuid}/assessments | Array<Assessment> | Get all of a student's assessments|
| GET | .../students/{nuid}/assessments/{assessmentID} | StudentAssessment | Get a student's instance of an assessment|
| GET | .../students/{nuid}/notes | Array<Note> | Get all of a student's notes|
| GET | .../students/{nuid}/pcfs | Array<PCF> | Get all of a student's PCFs|
|||||
| GET | .../courses? |  | Get all courses that match the query parameters |
| GET | .../courses/ |  | Get all courses |
| POST | .../courses/ |  | Create a course |
| PUT | .../courses/{courseID} |  | Update course with the given ID |
| GET | .../courses/name/{courseName} | Course | Get course with the given name |
| GET | .../courses/{courseID} | Course | Get course with the given ID |
| GET | .../courses/{courseID}/assessments | Array<Assessment> | Get a course's assessments |
| GET | .../courses/{courseID}/students | Array<Student> | Get a course's students |
|||||
| GET | .../assessments? | Array<Assessment> | Get all assessments that match the query parameters |
| GET | .../assessments/ | Array<Assessment> | Get all assessments |
| POST | .../assessments/ |  | Create an assessment |
| PUT | .../assessments/{assessmentID} |  | Update an assessment |
| GET | .../assessments/{assessmentID} | Assessment | Get assessment with the given ID |
| GET | .../assessments/{assessmentID}/instances | Array<StudentAssessment> | Get all instances of an assessment|
|||||
| GET | .../student-assessments? | Array<StudentAssessment> | Get all assessment instances that match the query parameters |
| GET | .../student-assessments/ | Array<StudentAssessment> | Get all assessment instances |
| POST | .../student-assessments/ |  | Create an assessment instance |
| PUT | .../student-assessments/{nuid}/{assessmentID} |  | Update an assessment instance |
| GET | .../student-assessments/{nuid}/{assessmentID} | StudentAssessment | Get an assessment instance |
|||||
| GET | .../student-courses/ | Array<StudentCourse> | Get all course instances |
| POST | .../student-courses/ |  | Create an course instance |
| PUT | .../student-courses/{nuid}/{courseID} |  | Update an course instance 
| GET | .../student-courses/{nuid}/{courseID} | StudentCourse | Get a course instance 
|||||
| GET | .../notes/ | Array<Note> | Get all notes |
| POST | .../notes/ |  | Create a note |
| PUT | .../notes/{noteID} |  | Update a note |
| GET | .../notes/{noteID} | NOte | Get a note with given ID |
