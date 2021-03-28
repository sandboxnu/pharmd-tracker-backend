import 'jest-sorted';
import { TestConnection } from "./utils/TestConnection";
import { MockFunctions } from "./mocks/MockFunctions";
import { CourseController } from "../CourseController";

let controller;
const course1 = { subject: "CS", number: 2500, name: "Fundies 1"};
const course2 = { subject: "CY", number: 2500, name: "some cyber course"};
const course3 = { subject: "DS", number: 3000, name: "Foundations of Data Science"};

beforeEach(async () => {
    await TestConnection.create();
    controller = new CourseController();
});

afterEach(async () => {
    await TestConnection.close();
});

describe('test each actions for the course controller', () => {
    describe('test the save action for creating courses', () => {
        const res = {};
        const req = MockFunctions.mockRequest(course1, {}, {});
        it('should return a valid course', async() => {
            const result = await controller.save(req, res);

            expect(result['subject']).toStrictEqual("CS");
            expect(result["number"]).toStrictEqual(2500);
            expect(result["name"]).toStrictEqual("Fundies 1");
        });
    });

    describe('test the filter action on courses', () => {
        const res: any = {
            set: jest.fn()
        };
        const courseList = [course1, course2, course3];
        const req2 = MockFunctions.mockRequest(courseList, {}, {});
        it('should return all courses without any filters', async () => {
            const req1 = MockFunctions.mockRequest({}, {},{});
            await controller.save(req2, {});

            const result = await controller.filter(req1, res);

            expect(result).toHaveLength(3);
            expect(res.set).toHaveBeenCalled();
        });
        it('should return 1 course for pagination', async () => {
            const query = {
                _start: 0,
                _end: 1
            };
            const req1 = MockFunctions.mockRequest({}, query,{});
            await controller.save(req2, {});

            const result = await controller.filter(req1, res);

            expect(result).toHaveLength(1);
            expect(res.set).toHaveBeenCalled();
        });
        it('should return courses in ASC order by number column', async () => {
            const query = {
                _order: 'ASC',
                _sort: 'number'
            };
            const req1 = MockFunctions.mockRequest({}, query, {});
            await controller.save(req2, {});

            const result = await controller.filter(req1, res);

            expect(result).toBeSortedBy('number', { descending: false});
            expect(result).toHaveLength(3);
            expect(res.set).toHaveBeenCalled();
        });
        it('should return courses in DESC order by name column', async() => {
            const query = {
                _order: 'DESC',
                _sort: 'name'
            };
            const req1 = MockFunctions.mockRequest({}, query, {});
            await controller.save(req2, {});

            const result = await controller.filter(req1, res);

            expect(result).toBeSortedBy('name', { descending: true});
            expect(result).toHaveLength(3);
            expect(res.set).toHaveBeenCalled();
        });
        it('should return courses with similar search query', async() => {
            const query = {
                name_like: 'cyber course'
            };
            const req1 = MockFunctions.mockRequest({}, query, {});
            await controller.save(req2, {});

            const result = await controller.filter(req1, res);

            expect(result).toHaveLength(1);
            expect(result[0]["name"]).toStrictEqual('some cyber course');
            expect(res.set).toHaveBeenCalled();
        });
    });
});