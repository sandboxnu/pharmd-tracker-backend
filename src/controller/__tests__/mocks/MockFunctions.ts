export const MockFunctions = {
    mockRequest(body, query, params) {
        return {
            body: body,
            query: query,
            params: params,
        };
    }
};