# Endpoint Guide

Important Notes!  

For endpoints that contain a {param}, the Parameters column lists *paramInURL: correspondingModelAttribute*. If a corresponding model attribute isn't listed, that means the parameter and attribute share the same name.  
For example, 'cohort: adjustedGradDate' means that {cohort} corresponds to the attribute *adjustedGradDate*. Alternatively, if only 'firstName' is listed, that means {firstName} corresponds to the attribute *firstName*.

## Table of Contents
 1. [About Query Endpoints](#about-query-endpoints)
 2. [Student Endpoints](#student-endpoints)
 3. [Course Endpoints](#course-endpoints)
 4. [Exam Endpoints](#exam-endpoints)
 5. [StudentExam Endpoints](#studentexam-endpoints)
 6. [StudentCourse Endpoints](#studentcourse-endpoints)
 7. [Note Endpoints](#note-endpoints)

## About Query Endpoints
[Back to Table of Contents](#table-of-contents)  

All query endpoints are the pluralized model name followed by '?' (ie. */objects?*).  
Parameters are assigned values using the syntax '*paramName=paramValue*'.  
Parameters are strung together using '&'.

#### Basic Query with And  

*/objects?param1=foo&param2=bar&param3=1234*  
Returns all objects where *param1* is *foo*, *param2* is *bar*, and *param3* is *1234*.   

#### Query with Or  

*/objects?param1=optionOne&param1=optionTwo*  
Returns all objects where *param1* is *optionOne* or *optionTwo*.   

#### Query with Min/Max  

*/objects?param1[min]=50*  
Returns all objects where *param1* is at least *50*, inclusive.

*/objects?param1[max]=70*  
Returns all objects where *param1* is at most *70*, inclusive.

*/objects?param1[min]=50&param1[max]=70*  
Returns all objects where *param1* is between *50* and *70*, inclusive. 

*/objects?param1=70*  
Returns all objects where *param1* is exactly *70*.

If a parameter can be queried with min and max, it will be listed next to the parameter name in the tables below, for example: gpa (min/max).

#### About String Queries  

String queries are case-sensitive at the moment.  

There are a few different ways that string queries may be treated:  
- Exact match: returns objects where string exactly matches given string
- Starts with: returns objects where string starts with the given string
- Substring: returns objects where string contains the given string  

If the query checks for *starts with* or *substring*, it will be listed next to the parameter name in the tables below, for example: firstName (startsWith), or courseName (substring). If nothing is listed next to a parameter name, this means the query will check for an *exact match*. 

## Student Endpoints  

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./students? | Get all students that match the query parameters | Array\<Student\> | <ul> <li> id </li> <li> firstName (substring) </li> <li> lastName (substring) </li> <li> entryDate </li> <li> entryType </li> <li> originalGradDate </li> <li> gradDate </li> <li> status </li> <li> gpa (min/max) </li> <li> preferredName </li> <li> gradDateChanges </li> <li> entryType </li> <li> hasVisa </li>  <li> isDualDegree </li> <li> leftProgram </li> </ul> |
| GET | \.\.\./students/ | Get all students | Array\<Student\> | |
| GET | \.\.\./students/\{id\} | Get student with given NUID | Student | <ul> <li> id </li> </ul> |
| GET | \.\.\./students/\{id\}/courses | Get all of a student's courses | Array\<Course\> | <ul> <li> id </li> </ul> |
| GET | \.\.\./students/\{studentId\}/courses/\{courseId\} | Get a student's instance of a course | StudentCourse | <ul> <li> studentId: id </li> <li> courseId </li> </ul> |
| GET | \.\.\./students/\{studentId\}/courses/\{courseID\}/exams | Get all student's exam instances from a course | Array\<StudentExam\> | <ul> <li> studentId: id </li> <li> courseId </li> </ul> |
| GET | \.\.\./students/\{id\}/exams | Get all of a student's exams | Array\<Exam\> | <ul> <li> id </li> </ul> |
| GET | \.\.\./students/\{studentId\}/exams/\{examId\} | Get a student's instance of an exam | StudentExam | <ul> <li> studentId: id </li> <li> examId </li> </ul> |
| GET | \.\.\./students/\{id\}/notes | Get all of a student's notes | Array\<Note\> | <ul> <li> id </li> </ul> |
| POST | \.\.\./students/ | Create a new student | | |
| PUT | \.\.\./students/\{id\} | Update student with given NUID | | <ul> <li> id </li> </ul> |
| DELETE | \.\.\./students/\{id\} | Delete student with given NUID | | <ul> <li> id </li> </ul> |

## Course Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./courses? | Get all courses that match the query parameters | | <ul> <li> id </li> <li> name (substring) </li> <li> subject (substring) </li> <li> number (min/max) </li> </ul> |
| GET | \.\.\./courses/ | Get all courses | | |
| GET | \.\.\./courses/\{id\} | Get course with the given ID | Course | <ul> <li> id </li> </ul> |
| POST | \.\.\./courses/ | Create a course | | |
| PUT | \.\.\./courses/\{id\} | Update course with the given course id | | <ul> <li> id </li> </ul> |
| DELETE | \.\.\./courses/\{id\} | Delete course with the given course id | | <ul> <li> id </li> </ul> |

## Exam Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./exam? | Get all exams that match the query parameters | Array\<Exam\> | <ul> <li> id </li> <li> name (substring) </li> </ul> |
| GET | \.\.\./exams/ | Get all exams | Array\<Exam\> | |
| GET | \.\.\./exams/\{id\} | Get exam with the given exam id | Exam | <ul> <li> id </li> </ul> |
| GET | \.\.\./exams/\{id\}/instances | Get all instances of an Exam given an exam id | Array\<StudentExam\> | <ul> <li> id </li> </ul> |
| POST | \.\.\./exams/ | Create an exam | | |
| PUT | \.\.\./exams/\{id\} | Update an exam given an exam id | | <ul> <li> id </li> </ul> |
| DELETE | \.\.\./exams/\{id\} | Delete an exam given an exam id | | <ul> <li> id </li> </ul> |


## StudentExam Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./studentExams? | Get all studentExam instances that match the query parameters | Array\<StudentExam\> | <ul> <li> id </li> <li> studentId </li> <li> examId </li> <li> letterGrade </li> <li> semester </li> <li> year (min/max) </li> <li> percentage (min/max) </li> </ul> |
| GET | \.\.\./studentExams/ | Get all studentExam instances | Array\<StudentExam\> | |
| GET | \.\.\./studentExams/\{id\} | Get a studentExam instance given a studentExam id | StudentExam | <ul> <li> id </li> </ul> |
| POST | \.\.\./studentExams/ | Create a studentExam instance | | |
| PUT | \.\.\./studentExams/\{id\} | Update a studentExam instance given a studentExam id | | <ul> <li> id </li> </ul> |
| DELETE | \.\.\./studentExams/\{id\} | Delete a studentExam instance given a studentExam id | | <ul> <li> id </li> </ul> |


## StudentCourse Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./studentCourses? | Get all studentCourse instances that match the given parameters | Array\<StudentCourse\> | <ul> <li> id </li> <li> studentId </li> <li> courseId </li> <li> percentage (min/max) </li> <li> letterGrade </li> <li> semester </li> <li> year (min/max) </li> </ul> |
| GET | \.\.\./studentCourses/ | Get all studentCourse instances | Array\<StudentCourse\> | |
| GET | \.\.\./studentCourses/\{id\} | Get a studentCourse instance given a studentCourse id | StudentCourse | <ul> <li> id </li> </ul> |
| POST | \.\.\./studentCourses/ | Create a studetnCourse instance | | |
| PUT | \.\.\./studentCourses/\{id\} | Update a studentCourse instance given a studentCourse id | | <ul> <li> id </li> </ul> |
| DELETE | \.\.\./studentCourses/\{id\} | Delete a studentCourse instance given the studentCourse id| | <ul> <li> id </li> </ul> |


## Note Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./notes? | Get all note instances that match the given parameters | Array\<Note\> | <ul> <li> id </li> <li> title (substring) </li> <li> body (substring) </li> <li> tags (substring) </li> </ul> |
| GET | \.\.\./notes/ | Get all notes | Array\<Note\> | |
| GET | \.\.\./notes/\{id\} | Get a note with the given note id | Note | <ul> <li> id </li> </ul> |
| POST | \.\.\./notes/ | Create a note | | |
| PUT | \.\.\./notes/\{id\} | Update a note given a note id| | <ul> <li> id </li> </ul> |
| DELETE | \.\.\./notes/\{id\} | Delete a note given a note id | | <ul> <li> id </li> </ul> |

