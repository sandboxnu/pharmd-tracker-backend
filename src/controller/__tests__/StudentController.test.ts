import 'jest-sorted';
import TestConnection from './utils/TestConnection';
import MockFunctions from './mocks/MockFunctions';
import StudentController from '../StudentController';
import { StudentStatus } from '../../entity/Enums';

let controller;
const student1 = {
  id: '123456789',
  lastName: 'ross',
  firstName: 'bob',
  entryDate: '09/18',
  gradDate: '05/22',
  originalGradDate: 'Spring 2022',
  status: StudentStatus.ENROLLED,
  gpa: 3.50,
};
const student2 = {
  id: '234567890',
  lastName: 'squarepants',
  firstName: 'spongebob',
  entryDate: '09/19',
  gradDate: '05/23',
  originalGradDate: 'Spring 2022',
  status: StudentStatus.ENROLLED,
  gpa: 3.69,
};
const student3 = {
  id: '000111222',
  lastName: 'smith',
  firstName: 'morty',
  entryDate: '09/19',
  gradDate: '05/22',
  originalGradDate: 'Spring 2022',
  status: StudentStatus.ENROLLED,
  gpa: 2.9,
};

beforeEach(async () => {
  await TestConnection.create();
  controller = new StudentController();
});

afterEach(async () => {
  await TestConnection.close();
});

describe('test each action in the student controller', () => {
  describe('test the filter action', () => {
    const res: any = {
      set: jest.fn(),
    };

    const studentList = [student1, student2, student3];
    const req1 = MockFunctions.mockRequest(studentList, {}, {});
    it('should return all students without any filters', async () => {
      const emptyReq = MockFunctions.mockRequest({}, {}, {});
      await controller.save(req1, {});

      const result = await controller.filter(emptyReq, res);

      expect(res.set).toHaveBeenCalled();
      expect(result).toHaveLength(3);
    });
    it('should return 2 courses from pagination', async () => {
      const query = {
        _start: 0,
        _end: 2,
      };
      const reqWithQuery = MockFunctions.mockRequest({}, query, {});
      await controller.save(req1, {});

      const result = await controller.filter(reqWithQuery, res);

      expect(res.set).toHaveBeenCalled();
      expect(result).toHaveLength(2);
    });
    it('should return students in ASC order by id', async () => {
      const query = {
        _order: 'ASC',
        _sort: 'id',
      };
      const reqWithQuery = MockFunctions.mockRequest({}, query, {});
      await controller.save(req1, {});

      const result = await controller.filter(reqWithQuery, res);

      expect(result).toBeSortedBy('id', { descending: false });
      expect(result).toHaveLength(3);
      expect(res.set).toHaveBeenCalled();
    });
    it('should return students in DESC order by gpa', async () => {
      const query = {
        _order: 'DESC',
        _sort: 'gpa',
      };
      const reqWithQuery = MockFunctions.mockRequest({}, query, {});
      await controller.save(req1, {});

      const result = await controller.filter(reqWithQuery, res);

      expect(result).toBeSortedBy('gpa', { descending: true });
      expect(result).toHaveLength(3);
      expect(res.set).toHaveBeenCalled();
    });
    it('should return students with similar ids', async () => {
      const query = {
        id_like: '000',
      };
      const reqWithQuery = MockFunctions.mockRequest({}, query, {});
      await controller.save(req1, {});

      const result = await controller.filter(reqWithQuery, res);

      expect(res.set).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].id).toStrictEqual('000111222');
    });
  });
});
