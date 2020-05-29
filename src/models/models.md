# Model Definitions
Important Notes!   
Attributes *can be null* and *do not have to unique*, unless otherwise specified.  
*If a constraint is listed after an asterisk, this means that the constraint is not fully enforced in code yet.

## Table of Contents
1. [Student](#student)
2. [Course](#course)
3. [Assessment](#assessment)
4. [StudentCourse](#studentcourse)
5. [StudentAssessment](#studentassessment)
6. [Note](#note)
7. [PCF](#pcf)
8. [Associations](#associations)


## Student

[Back to Table of Contents](#table-of-contents)

#### NUID - String  
*this student's Northeastern student ID*  
- Primary key
- Cannot be null
- Must be unique
- Must be length 9
- Must contain only digits

#### lastName - String  
*this student's last name*  
- Cannot be null

#### firstName - String  
*this student's first name(s)*  
- Cannot be null

#### originalGradDate - String  
*this student's original graduation year, at time of entry*  
- Cannot be null 
- Must be length 5
- *Format must be 5-char abbreviation of academic year, ie. "08/09" for the 2008-2009 academic year, "19/20" for the 2019-2020 academic year.

#### adjustedGradDate - String  
*this student's current graduation year, including any drop backs*  
- Cannot be null 
- Must be length 5
- *Format must be 5-char abbreviation of academic year, ie. "08/09" for the 2008-2009 academic year, "19/20" for the 2019-2020 academic year.

#### status - Enum["Enrolled", "Leave", "Drop Back", "Co-Op"]  
*this student's current status in the program*  
"Enrolled" *indicates the student in currently in the program*  
"Leave" *indicates the student is on leave*  
"Drop Back" *indicates the student has dropped back*  
"Co-Op" *indicates the student in current on co-op*  
- Cannot be null

#### preferredName - String  
*this student's preferred name*  

#### visa - Enum[ "F1" ,  ""]  
*this student's visa status:*  
"F1" *indicates student visa*  
 "" *indicates no visa*  

#### entryType - Enum[ "DE", "EA"]  
*how this student entered the program:*  
"DE" *indicates XX*  
"EA" *indicates XX*  

#### dualDegree - Enum["MPH", ""]  
*this student's type of dual degree, if applicable*  
"MPH" *indicates XX*  
"" *indicates no dual degree*  

#### entryToP1 - String  
*the semester that this student entered the program*  
- Must be length 7
- *Format must be 2-char semester abbreviation followed by 4-digit year, ie. "FL 2019" for Fall 2019,  "SP 2020" for Spring 2020.

#### gradDateChange - Array(String)  
*a list of this student's previous graduation dates*  

#### leftProgram - String  
*this student's reason for leaving the program*  
- Field will be null if a student has not left the program, otherwise will contain a string

#### GPA - double  
*this student's cumulative grade point average, on a 4.0 scale*  
- Default value is 0
- Must be between [0, 4]

## Course

[Back to Table of Contents](#table-of-contents)

#### courseID - String  
*the identifier of this course*  
Note: format not yet determined/enforced  
- Primary key
- Cannot be null
- Must be unique

#### courseName - String  
*the name of this course*  
- Cannot be null
- Must be unique

## Assessment

[Back to Table of Contents](#table-of-contents)

#### assessmentID - String  
*the identifier of this assessment*  
Note: format not yet determined/enforced  
- Primary key
- Cannot be null
- Must be unique

#### assessmentName - String  
*the name of this assessment*  
- Cannot be null
- Must be unique

~~**type** - Enum["Exam", "Quiz"]~~

## StudentCourse

[Back to Table of Contents](#table-of-contents)

Combination of (NUID, courseID, term) must be unique.  

#### NUID - String  
*the Northeastern ID of the student who took this course instance*  
- Cannot be null
- Must have length 9
- Must be numeric

#### courseID - String  
*the course ID of the course that this student took in this course instance*  
- Cannot be null

#### term - String  
*the term in which the student took this course instance*  
- Cannot be null
- *Format must be 2-char semester abbreviation followed by 4-digit year, ie. "FL 2019" for Fall 2019,  "SP 2020" for Spring 2020.

#### percentage - double  
*the overall percentage grade the student received in this course instance*   
- Must be between [0, 100]

#### letterGrade - Enum['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F']  
*the overall letter grade the student received in this course instance*  

## StudentAssessment

[Back to Table of Contents](#table-of-contents)

Combination of (NUID, assessmentID) must be unique.  

#### NUID - String  
*the Northeastern ID of the student who took this assessment instance*  
- Cannot be null
- Must be length 9
- Must be numeric

#### assessmentID - String  
*the assessment ID of the assessment in this assessment instance*  
- Cannot be null

#### courseID - String  
*the course ID of the course this assessment instance was taken for*  
- Cannot be null

#### assessmentName -String  
*the name of the assessment that was taken in this assessment instance*  
- Cannot be null

#### percentage - double  
*the percentage score received by the student in this assessment instance*  
- Must be between [0, 100]

#### letterGrade - Enum['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F']  
*the letter score received by the student in this assessment instance*  

## Note

[Back to Table of Contents](#table-of-contents)

#### noteID - String  
*the identifier of this note*  
Note: format not yet decided/enforced  
- Primary key
- Cannot be null
- Must be unique

#### date  - Date  
*the date this note was created*  
- Cannot be null

#### title - String  
*the title of this note*  
- Cannot be null

#### body - String  
*the body of this note*  
- Cannot be null

#### tags - Array(String)  
*the tags associated with this note*  

## PCF  
Professional Conduct Form  
Note: no longer needed - PCFs contained in Notes 

[Back to Table of Contents](#table-of-contents)

#### pcfID - String  
*the identifier of this PCF*  
Note: format unspecified  
- Primary key
- Cannot be null
- Must be unique

#### submissionDate - Date  
*the date that this PCF was submitted*  
- Cannot be null

#### submittedBy - String  
*who submitted this PCF*  
- Cannot be null

#### type - Enum['Portfolio', 'Classroom', 'IPPE', 'APPE']  
*the type of this PCF*  
- Cannot be null

#### reviewedBy - Enum['PCF Only', 'APCB', 'ASC']  
*the body that reviewed this PCF*  
- Cannot be null

#### meetingDate - Date  
*the date that student was met with to discuss this PCF*  

#### decisionRendered - String  
*the decision reached by reviewing body regarding this PCF*  

## Associations

[Back to Table of Contents](#table-of-contents)

#### Many-to-Many:
- Students and Courses have a Many-to-Many association through the StudentCourse model.
- Students and Assessments have a Many-to-Many association through the StudentAssessment model.

#### One-to-Many:
- Courses and Assessments have a One-to-Many association (assessments contain courseID as a foreign key).
- Students and Notes have a One-to-Many association (notes contain NUID as a foreign key).
- Students and PCFs have a One-to-Many association (pcfs contain NUID as a foreign key).
