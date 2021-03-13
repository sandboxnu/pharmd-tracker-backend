import "reflect-metadata";
import {TestConnection} from "./utils/TestConnection";
import { CourseController } from "../CourseController";

let controller;
const course1 = { subject: "CS", number: "2500", name: "Fundies 1"};

beforeEach(async () => {
    await TestConnection.create()
    //TODO: make this singleton
    controller = new CourseController();
});

afterEach(async () => {
    await TestConnection.close();
});

const mockRequest = (body, query, params) => {
    return {
        body: body,
        query: query,
        params: params,
    };
};


describe('test the save action for creating courses', () => {
    const res = {};
    const req = mockRequest(course1, {}, {});
    it('should return a valid course', () => {
        return controller.save(req, res).then(result => {
            expect(result['subject']).toStrictEqual("CS");
            expect(result["number"]).toStrictEqual("2500");
            expect(result["name"]).toStrictEqual("Fundies 1");
        });
    });
});