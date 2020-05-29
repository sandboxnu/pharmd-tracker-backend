## Table of Contents
 1. [General Notes](#general-notes)
 2. [About Query Endpoints](#about-query-endpoints)
 3. [Student Endpoints](#student-endpoints)
 4. [Course Endpoints](#course-endpoints)
 5. [Assessment Endpoints](#assessment-endpoints)
 6. [StudentAssessment Endpoints](#studentassessment-endpoints)
 7. [StudentCourse Endpoints](#studentcourse-endpoints)
 8. [Note Endpoints](#note-endpoints)


## General Notes

For endpoints that contain a {param}, the Parameters column lists *paramInURL: correspondingModelAttribute*.  
For example, *cohort: adjustedGradDate* means that {cohort} corresponds to the adjustedGradDate.

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
| GET | \.\.\./students? | Get all students that match the query parameters | Array\<Student\> | <ul> <li> NUID (exact) </li> <li> firstName (startsWith) </li> <li> lastName (startsWith) </li> <li> visa </li> <li> entryType </li> <li> dualDegree </li> <li> entryToP1 </li> <li> originalGradDate </li> <li> adjustedGradDate </li> <li> gradDateChange </li> <li> leftProgram </li> <li> status </li> <li> GPA </li> </ul> |
| GET | \.\.\./students/ | Get all students | Array\<Student\> | |
| POST | \.\.\./students/ | Create a new student | | |
| PUT | \.\.\./students/\{nuid\} | Update student with given NUID | | <ul> <li> nuid: NUID </li> </ul> |
| GET | \.\.\./students/cohort/\{cohort\} | Get all students in given cohort | Array\<Student\> | <ul> <li> cohort: adjustedGradDate </li> </ul> |
| GET | \.\.\./students/f1 | Get all international students | Array\<Student\> | |
| GET | \.\.\./students/name/\{firstName\}\-\{lastName\} | Get student with given first and last name | Student | <ul> <li> firstName: firstName </li> <li> lastName: lastName </li> </ul> |
| GET | \.\.\./students/\{nuid\} | Get student with given NUID | Student | <ul> <li> nuid: NUID </li> </ul> |
| GET | \.\.\./students/\{nuid\}/courses | Get all of a student's courses | Array\<Course\> | <ul> <li> nuid: NUID </li> </ul> |
| GET | \.\.\./students/\{nuid\}/courses/\{courseID\} | Get a student's instance of a course | StudentCourse | <ul> <li> nuid: NUID </li> <li> courseID: courseID </li> </ul> |
| GET | \.\.\./students/\{nuid\}/courses/terms/\{term\} | Get all of a student's course instances in a term | Array\<StudentCourse\> | <ul> <li> nuid: NUID </li> <li> term: term </li> </ul> |
| GET | \.\.\./students/\{nuid\}/courses/\{courseID\}/assessments | Get all student's assessment instances from a course | Array\<StudentAssessment\> | <ul> <li> nuid: NUID </li> <li> courseID: courseID </li> </ul> |
| GET | \.\.\./students/\{nuid\}/assessments | Get all of a student's assessments | Array\<Assessment\> | <ul> <li> nuid: NUID </li> </ul> |
| GET | \.\.\./students/\{nuid\}/assessments/\{assessmentID\} | Get a student's instance of an assessment | StudentAssessment | <ul> <li> nuid: NUID </li> <li> assessmentID: assessmentID </li> </ul> |
| GET | \.\.\./students/\{nuid\}/notes | Get all of a student's notes | Array\<Note\> | <ul> <li> nuid: NUID </li> </ul> |
| GET | \.\.\./students/\{nuid\}/pcfs | Get all of a student's PCFs | Array\<PCF\> | <ul> <li> nuid: NUID </li> </ul> |


## Course Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./courses? | Get all courses that match the query parameters | | <ul> <li> courseID </li> <li> courseName (substring) </li> </ul> |
| GET | \.\.\./courses/ | Get all courses | | |
| POST | \.\.\./courses/ | Create a course | | |
| PUT | \.\.\./courses/\{courseID\} | Update course with the given ID | | <ul> <li> courseID: courseID </li> </ul> |
| GET | \.\.\./courses/name/\{courseName\} | Get course with the given name | Course | |
| GET | \.\.\./courses/\{courseID\} | Get course with the given ID | Course | <ul> <li> courseID: courseID </li> </ul> |
| GET | \.\.\./courses/\{courseID\}/assessments | Get a course's assessments | Array\<Assessment\> | <ul> <li> courseID: courseID </li> </ul> |
| GET | \.\.\./courses/\{courseID\}/students | Get a course's students | Array\<Student\> | <ul> <li> courseID: courseID </li> </ul> |


## Assessment Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./assessments? | Get all assessments that match the query parameters | Array\<Assessment\> | <ul> <li> assessmentID </li> <li> assessmentName (substring) </li> </ul> |
| GET | \.\.\./assessments/ | Get all assessments | Array\<Assessment\> | |
| POST | \.\.\./assessments/ | Create an assessment | | |
| PUT | \.\.\./assessments/\{assessmentID\} | Update an assessment | | <ul> <li> assessmentID: assessmentID </li> </ul> |
| GET | \.\.\./assessments/\{assessmentID\} | Get assessment with the given ID | Assessment | <ul> <li> assessmentID: assessmentID </li> </ul> |
| GET | \.\.\./assessments/\{assessmentID\}/instances | Get all instances of an assessment | Array\<StudentAssessment\> | <ul> <li> assessmentID: assessmentID </li> </ul> |


## StudentAssessment Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./student\-assessments? | Get all assessment instances that match the query parameters | Array\<StudentAssessment\> | <ul> <li> studentAssessmentID </li> <li> assessmentID </li> <li> NUID </li> <li> courseID </li> <li> assessmentName (substring) </li> <li> percentage </li> <li> letterGrade </li> </ul> |
| GET | \.\.\./student\-assessments/ | Get all assessment instances | Array\<StudentAssessment\> | |
| POST | \.\.\./student\-assessments/ | Create an assessment instance | | |
| POST | \.\.\./student\-assessments/all | Creates many assessments from given array | | |
| PUT | \.\.\./student\-assessments/\{nuid\}/\{assessmentID\} | Update an assessment instance | | <ul> <li> nuid: NUID </li> <li> assessmentID: assessmentID </li> </ul> |
| GET | \.\.\./student\-assessments/\{nuid\}/\{assessmentID\} | Get an assessment instance | StudentAssessment | <ul> <li> nuid: NUID </li> <li> assessmentID: assessmentID </li> </ul> |


## StudentCourse Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./student\-courses? | Get all course instances that match the given parameters | Array\<StudentCourse\> | <ul> <li> NUID </li> <li> courseID </li> <li> percentage </li> <li> letterGrade </li> <li> term </li> </ul> |
| GET | \.\.\./student\-courses/ | Get all course instances | Array\<StudentCourse\> | |
| POST | \.\.\./student\-courses/ | Create an course instance | | |
| PUT | \.\.\./student\-courses/\{nuid\}/\{courseID\} | Update an course instance | | <ul> <li> nuid: NUID </li> <li> courseID: courseID </li> </ul> |
| GET | \.\.\./student\-courses/\{nuid\}/\{courseID\} | Get a course instance | StudentCourse | <ul> <li> nuid: NUID </li> <li> courseID: courseID </li> </ul> |


## Note Endpoints

[Back to Table of Contents](#table-of-contents)

| Type | URL | Description | Returns | Parameters |
|------|-----|-------------|---------|------------|
| GET | \.\.\./notes/ | Get all notes | Array\<Note\> | |
| POST | \.\.\./notes/ | Create a note | | |
| PUT | \.\.\./notes/\{noteID\} | Update a note | | <ul> <li> noteID: noteID </li> </ul> |
| GET | \.\.\./notes/\{noteID\} | Get a note with given ID | Note | <ul> <li> noteID: noteID </li> </ul> |