INSERT INTO public.students(
	"NUID", "lastName", "firstName", "preferredName", visa, "entryType", "dualDegree", "entryToP1", "originalGradDate", "adjustedGradDate", "gradDateChange", "leftProgram", status, "GPA", "createdAt", "updatedAt")
	VALUES ('12345', 'Smith', 'Joe', 'J', null, null, null, '2020', '2020', '2021', null, null, null, 4.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.students(
	"NUID", "lastName", "firstName", "preferredName", visa, "entryType", "dualDegree", "entryToP1", "originalGradDate", "adjustedGradDate", "gradDateChange", "leftProgram", status, "GPA", "createdAt", "updatedAt")
	VALUES ('54321', 'Green', 'Susan', 'Sue', 'F1', null, null, '2022', '2022', '2022', null, null, null, 3.9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.courses(
	"courseID", "courseName", "createdAt", "updatedAt")
	VALUES ('1', 'orgo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.courses(
	"courseID", "courseName", "createdAt", "updatedAt")
	VALUES ('2', 'bio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.assessments(
	"assessmentID", "assessmentName", type, "createdAt", "updatedAt", "courseID")
	VALUES ('10', 'orgo test 1', 'Exam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1');

INSERT INTO public.assessments(
	"assessmentID", "assessmentName", type, "createdAt", "updatedAt", "courseID")
	VALUES ('20', 'bio test 3', 'Exam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2');

INSERT INTO public.studentcourses(
	"NUID", "courseID", percentage, "letterGrade", term, "createdAt", "updatedAt")
	VALUES ('12345', '1', '99', 'A', 'SP20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.studentcourses(
	"NUID", "courseID", percentage, "letterGrade", term, "createdAt", "updatedAt")
	VALUES ('54321', '2', '80', 'B-', 'SP18', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.studentassessments(
	"assessmentID", "NUID", "courseID", "assessmentName", percentage, "letterGrade", "createdAt", "updatedAt")
	VALUES ('10', '12345', '1', 'orgo test 1', '90', 'A-', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.studentassessments(
	"assessmentID", "NUID", "courseID", "assessmentName", percentage, "letterGrade", "createdAt", "updatedAt")
	VALUES ('20', '54321', '2', 'bio test 3', '99', 'A', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);