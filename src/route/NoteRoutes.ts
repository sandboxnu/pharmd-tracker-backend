import {NoteController} from "../controller/NoteController";
import {Config as config} from "./Config";

const BASE_PATH = "/notes";

export const NoteRoutes = [
    {
        method: config.GET,
        route: BASE_PATH,
        controller: NoteController,
        action: "filter"
    },
    {
        method: config.POST,
        route: BASE_PATH,
        controller: NoteController,
        action: "save"
    },
    {
        method: config.PUT,
        route: BASE_PATH + "/:id",
        controller: NoteController,
        action: "save"
    },
    {
        method: config.PATCH,
        route: BASE_PATH + "/:id",
        controller: NoteController,
        action: "update"
    },
    {
        method: config.GET,
        route: BASE_PATH + "/:id",
        controller: NoteController,
        action: "findById"
    },
    {
        method: config.DELETE,
        route: BASE_PATH + "/:id",
        controller: NoteController,
        action: "remove"
    },
];
