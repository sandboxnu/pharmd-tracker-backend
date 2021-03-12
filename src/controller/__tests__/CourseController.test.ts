import {TestConnection} from "./config/TestConnection";
import { CourseController } from "../CourseController";

let controller:CourseController = new CourseController();

const course1 = { subject: "CS", number: "2500", name: "Fundies 1"};

beforeEach(async () => {
    await TestConnection.create();
});

afterEach(async () => {
    await TestConnection.close();
});

const mockRequest = (data) => {
    return {
        body: data,
    };
};

describe('test the save action for creating courses', () => {
    const res = {};
    const req = mockRequest(course1);
    it('should return a valid course', () => {
        const course = controller.save(req, res);
        expect(course["subject"]).toStrictEqual("CS");
    });

    // it('should error when course cannot be created', () => {
    //
    // });
});