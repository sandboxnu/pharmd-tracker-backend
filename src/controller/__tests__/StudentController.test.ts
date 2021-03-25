import 'jest-sorted';
import { TestConnection } from "./utils/TestConnection";
import { MockFunctions } from "./mocks/MockFunctions";
import { StudentController } from "../StudentController";

let controller;

beforeEach(async () => {
    await TestConnection.create();
    controller = new StudentController();
});

afterEach(async () => {
    await TestConnection.close();
});

describe('test each action in the student controller', () => {
    describe('test the filter action', () => {

    });
});