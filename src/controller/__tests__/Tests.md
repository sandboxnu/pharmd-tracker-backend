# Cool and Hip Guide to Testing
![ test-gif](https://media.giphy.com/media/3o6Mbbs879ozZ9Yic0/giphy.gif)


## [Table of Contents](#table-of-contents)

- [What is the Testing Framework](#what-is-the-testing-framework)
- [TypeORM Config Setup](#typeorm-config-setup)
    * [Babel and TypeScript](#babel-and-typescript)
- [Setting Up Tests](#setting-up-tests)
    * [Jest Naming Conventions](#jest-naming-conventions)
    * [Setting Up the Test Database Connection](#setting-up-the-test-database-connection)
    * [Scoping](#scoping)
    * [Promises!](#promises!)
    * [Mocks!](#mocks!)
    * [AAA](#aaa)
- [Possible Errors/Solutions](#possible-errors/solutions)
- [Other packages added with Jest](#other-packages-added-with-jest)

## What is the Testing Framework?
The backend's testing suite is set up with the [Jest](https://jestjs.io/) framework that is popularly used in Node environments, but it can also be used on the frontend as well! This documentation tries to introduce Jest and how to set up unit tests for your pull requests.

The context of this documentation is mainly for testing the Controllers in the backend and not much for the endpoints/routes. Since we want to set up unit tests, it would make more sense to test the code functionality in the Controller that doesn't rely on the API layer that simply passes the necessary arguments to a Controller's action. The API layer is also in itself a thin layer and testing whether the server can receive requests wouldn't reveal much to us.

## TypeORM Config Setup
With the new testing framework being added to the backend, the unit tests will connect to an entirely different connection from the `ormconfig.json` file. This is to separate database connection between development and testing.

The ormconfig file should have 2 config objects that are each named `dev` used during development and for the server and `test` used specifically for the unit tests. Both of these connection configs are mostly the same except `test` will have the `dropSchema` turned on.

Configs like `username` and `password` can be the same but you likely would want to name the `database` differently between `dev` and `test` to not mess up any data you have saved locally.
**Also, make sure that the Postgres database for `test` is created on your computer if this is your first time setting up!**

### Babel and TypeScript
Since the backend is mostly, if not all, in TypeScript 🌊, Babel is used to help Jest run the tests. In short, Babel is a compiler that translates the code into JavaScript that Jest can understand.

There is also a `babel.config.js` file in the project's root directory if any configs need to be added.

## Setting Up Tests
### Jest Naming Conventions
All tests relating to the `Controllers` are placed in the `__tests__` folder as Jest uses that naming convention to find any test files.  On a granular level, any new test files should be named `<fileName>.test.ts` (e.g. `CourseController.test.ts` for the `CourseController` class). This is to follow up with the previous naming conventions, but also helps Jest determine which file should be tested.

### Setting Up the Test Database Connection
The exported module from `__tests__/utils/TestConnection.ts` handles spinning up and tearing down of the test database configured in the `ormconfig.json`. There are currently 2 functions that covers this respectively, `create()` and `close()`.

Every time a new connection is created, the database schema will be cleared with the `dropSchema` config set in `ormconfig.json`. The idea is that every test will be provided a clean slate to avoid any hardcoding or test failures that may rely on an empty state.

It's important to have these Jest helper functions in each test file for setup and teardown,

    let controller;  
    
    beforeEach(async () => {  
	    await TestConnection.create();  
	    controller = new Controller(); // whatever controller you're testing  
    });
    
    afterEach(async () => {  
      await TestConnection.close();  
    });

### Scoping
In each test file, there should be a hierarchy of 3 levels of the test represented in the image and example below.
- At the highest level, all tests in a file are grouped by the Controller being tested illustrated by a single `describe` block.
- At the level below, there can be multiple `describe` blocks that represent groups of tests each public methods in the Controller.
- At the final and much more granular level, there are multiple `it` or `test` blocks to represent different test cases of each method.  (Using either `it` or `test` makes no difference in functionality as one is simply syntactic sugar for the other). Also, these blocks will usually have Jest's `expect` statements which are more or less `assert` statements from JUnit.

![scope diagram](https://i.ibb.co/K6nvhSW/Capture.png)


```
describe('test each actions for course controller', () => {  \\ groups all the tests under a describe block at a controller level
    describe('test the save action for creating courses', () => {  \\ groups all tests under a describe block for a specific action/method
	    it('should return a valid course', () => { \\ a unit test for a specific test case
		    expect(...);
		  });  
		it('should throw error on invalid course', () => {
		    expect(...);
		  });  
		});  
});
```

### Promises!
One of the most notable (or notorious 👀) characteristics of JavaScript are promises! The return values of any of the Controller's actions will likely be wrapped in some sort of `Promise` in which we can use the `async/await` approach like so,

```
it('should return all courses without any filters', async () => {  // tells Jest to run asynchronously
    const req1 = mockRequest({}, {},{});  
	await controller.save(req2, res);  // await resolves the promise for creating courses
  
	const result = await controller.filter(req1, res); // await resolves the get request
  
	expect(result).toHaveLength(3);  
});
```
There is also another way of resolving promises with the `then` function, but it would be much preferred to use the above `async/await` style to have a clearer and readable test.

Also, these tests will run asynchronously with the above approach that will ensure no tests will interfere with each other.

More information about Promises and asynchronous stuff can be found [here](https://jestjs.io/docs/asynchronous#asyncawait)!

### Mocks!
One of my personal favorites of testing is using mocks that set aside any external objects or methods as dummies to focus more on what is actually being tested.

Mocks are useful like in this example where `response` headers are being set but isn't necessarily the focus of a unit test, where we want to check the `courses` being returned.
```
async filter(request: Request, response: Response, next?: NextFunction) {  
    try {  
    // some code here
    ...

	const courses = await ...
  
	await response.set({  // response being used to set headers
		 'X-Total-Count': courses.length,  
		 'Access-Control-Expose-Headers': ['X-Total-Count']  
		});  
	 return courses;  // would want to test this mainly
  } catch ...
```

So during test setup, we can leverage `jest.fn` to mock the `set` function for `response` like below and pass that object along as the argument

```
const res: any = {  
    set: jest.fn()  // mocking the set function
};

const courseList = [course1, course2, course3];  
const req2 = MockFunctions.mockRequest(courseList, {}, {});  // psuedo-mock function to build request
it('should return all courses without any filters', async () => {  
    const req1 = MockFunctions.mockRequest({}, {},{});  
	await controller.save(req2, res);  // mocked res is passed here
  
	const result = await controller.filter(req1, res);  
  
	expect(result).toHaveLength(3);  
	expect(res.set).toHaveBeenCalled(); // checks if mock's set is called once
});
```
And, if we really wanted to check if the mocked function has been called, Jest provides matches like `toHaveBeenCalled()` or `toHaveBeenCalledTimes()` to see if the `res.set` was used properly.

Within in the `__tests__/mocks` folder, there is a `MockFunctions.ts` file that currently has the `mockRequest` function as a way to psuedo-mock and build `Requests` for the Controller actions. The folder can also be a place to store dummy data if it is used in multiple Controller tests.

Jest provides a plethora of details about mocks and how to use them [here](https://jestjs.io/docs/mock-functions)!

### AAA
In the past few code block examples, you might notice that each `it` block is organized in a subtle way (or maybe you didn't notice, I probably wouldn't lol).

First off, AAA stands for Assemble, Action, and Assert and it's a style of organizing the code in a test.
As you probably would have guessed,
- Assemble - anything relating to setting up, like local variables or inserting data
- Action - the actual call to the method being tested
- Assert - any `assert` or,  in our case, `expect` statements to test the results

So in the previous example,
```
it('should return all courses without any filters', async () => {  
    const req1 = MockFunctions.mockRequest({}, {},{});  
	await controller.save(req2, res);  // assemble
  
	const result = await controller.filter(req1, res);  // action
  
	expect(result).toHaveLength(3);  
	expect(res.set).toHaveBeenCalled(); // assert
});
```
**TLDR**: put new lines after each A in AAA to make it easier to read for others 😃.

## Possible Errors/Solutions
Setting up tests can be a pain, so here are some errors that you may come across that I have solutions for


>     ConnectionNotFoundError: Connection "default" was not found.

You are likely trying to initialize some `Controller` before `TestConnection.create();` is being called and at that point, there is no database created yet for the Controller to use `getRepository`. This is why it's important to initialize the `Controller` after connection creation in each `beforeEach` as shown [previously](#setting-up-the-test-database-connection).

> Error: expect(received).toStrictEqual(expected) // deep equality \
> Expected: "CS"\
> Received: undefined


If something is undefined, it might be because you didn't use `async/await` and the returned promised never got resolved :(.
\
\
Remember to run `npm i`!!
Feel free to add any instances/solutions here that you feel can be shared with others!

## Other packages added with Jest
Along with Jest, there are a few other external packages added to help streamline testing.

**[jest-sorted](https://www.npmjs.com/package/jest-sorted)**
This package makes it easier to test the sorting and ordering of arrays with the functions `toBeSorted` and `toBeSortedBy`, making it really neato to not have to hardcode an iterator!

