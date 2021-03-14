import {UserController} from "../controller/UserController";
import {Config as config} from "./Config";

const BASE_PATH = "/users";

export const UserRoutes = [
    {
        method: config.GET,
        route: BASE_PATH,
        controller: UserController,
        action: "filter"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id",
        controller: UserController,
        action: "findById"
    },
    {
        method: config.POST,
        route: BASE_PATH,
        controller: UserController,
        action: "save"
    },
    {
        method: config.PUT,
        route: BASE_PATH + "/:id",
        controller: UserController,
        action: "save"
    },
    {
        method: config.DELETE,
        route: BASE_PATH + "/:id",
        controller: UserController,
        action: "remove"
    }
];
