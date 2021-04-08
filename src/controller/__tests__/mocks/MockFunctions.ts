const MockFunctions = {
    mockRequest(body, query, params) {
        return {
            body,
            query,
            params,
        };
    },
};

export default MockFunctions;
