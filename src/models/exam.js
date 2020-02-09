import {Op} from "sequelize";
import uuidv4 from 'uuid/v4';

const exam = (sequelize, DataTypes) => {
    const Exam = sequelize.define('exam', {
        examId: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true
        },
        examName: {
            type: DataTypes.STRING,
            unique: true,
        },
        course: {
            type: DataTypes.STRING,
            unique: false,
        },
        studentId: {
            type: DataTypes.STRING
        }
    });


    /**
     * Queries all exams for a provided student in their provided course
     * @param studentId the student whose exams need querying
     * @param course the course to look for exams in
     * @returns {Promise<Model[]>} a promise providing the requested exams
     */
    Exam.getStudentExamsFromClass = async (studentId, course) =>
        await Exam.findAll({
            where: {
                [Op.and]: [
                    {studentId},
                    {course}
                ]
            }
        });

    /**
     * Adds a new exam to this DB
     * @param exam the object holding data about exam to be added
     * @returns {Promise<void> | Model} a promise providing a callback from creation
     */
    Exam.addNewExam = async (exam) =>
        Exam.create({
            ...exam,
            examId: uuidv4()
        });

    /**
     *Updates the exam with given ID in the DB
     * @param examId the ID of the exam to update
     * @param exam an object with the fields to update
     * @returns {Promise<[number, Model[]]>} A promise with status of update
     */
    Exam.updateExam = async (examId, exam) =>
        Exam.update({
            ...exam
        }, {
            where: {
                examId
            }
        });


    return Exam;
};

export default exam;
