import {UserController} from "../controller/UserController";

export const UserRoutes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "filter"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "findById"
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    },
    {
        method: "put",
        route: "/users/:id",
        controller: UserController,
        action: "save"
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    }
];
