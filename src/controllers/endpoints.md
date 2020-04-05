
Backend Endpoints

Students

| Type        | URL         | Parameters  | Description |
| ----------- | ----------- | ----------- | ----------- |
|  |  |  |  |
| GET | .../students/ |  | Get all students |
| POST | .../students/ |  | Create a new student |
| PUT | .../students/{nuid} |  | Update student with given NUID |
| GET | .../students/cohort/{cohort} |  | Get all students in given cohort |
| GET | .../students/visa/f1 |  | Get all international students |
| GET | .../students/{firstName}-{lastName} |  | Get student with given first and last name |
| GET | .../students/{nuid} |  | Get student with given NUID |
| GET | .../students/{nuid}/courses |  | Get all of a student's courses|
| GET | .../students/{nuid}/courses/{courseID} |  | Get a student's instance of a course |
| GET | .../students/{nuid}/courses/terms/{term} |  | Get all of a student's courses in a term |
| GET | .../students/{nuid}/courses/{courseID}/assessments |  | Get all student's assessment instances from a course |
| GET | .../students/{nuid}/assessments |  | Get all of a student's assessments|
| GET | .../students/{nuid}/assessments/{assessmentID} |  | Get a student's instance of an assessment|
| GET | .../students/{nuid}/notes |  | Get all of a student's notes|
| GET | .../students/{nuid}/pcfs |  | Get all of a student's PCFs|
|  |  |  |  |
| GET | .../courses/ |  | Get all courses |
| POST | .../courses/ |  | Create a course |
| PUT | .../courses/{courseID} |  | Update course with the given ID |
| GET | .../courses/{courseName} |  | Get course with the given name |
| GET | .../courses/{courseID} |  | Get course with the given ID |
| GET | .../courses/{courseID}/assessments |  | Get a course's assessments |
| GET | .../courses/{courseID}/students |  | Get a course's students |
|  |  |  |  |
| GET | .../assessments/ |  | Get all assessments |
| POST | .../assessments/ |  | Create an assessment |
| PUT | .../assessments/{assessmentID} |  | Update an assessment |
| GET | .../assessments/{assessmentID} |  | Get assessment with the given ID |
| GET | .../assessments/{assessmentID}/instances |  | Get all instances of an assessment|
|  |  |  |  |
| GET | .../student-assessments/ |  | Get all assessment instances |
| POST | .../student-assessments/ |  | Create an assessment instance |
| POST | .../student-assessments/all |  | Creates many assessments from given array |
| PUT | .../student-assessments/{nuid}/{assessmentID} |  | Update an assessment instance |
| GET | .../student-assessments/{nuid}/{assessmentID} |  | Get an assessment instance |
|  |  |  |  |
| GET | .../student-courses/ |  | Get all course instances |
| POST | .../student-courses/ |  | Create an course instance |
| PUT | .../student-courses/{nuid}/{courseID} |  | Update an course instance 
| GET | .../student-courses/{nuid}/{courseID} |  | Get a course instance 
|  |  |  |  |
| GET | .../notes/ |  | Get all notes |
| POST | .../notes/ |  | Create a note |
| POST | .../notes/{noteID} |  | Update a note |


