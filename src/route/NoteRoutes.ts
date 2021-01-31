import {NoteController} from "../controller/NoteController";

export const NoteRoutes = [
    {
        method: "get",
        route: "/notes",
        controller: NoteController,
        action: "filter"
    },
    {
        method: "post",
        route: "/notes",
        controller: NoteController,
        action: "save"
    },
    {
        method: "put",
        route: "/notes/:id",
        controller: NoteController,
        action: "save"
    },
    {
        method: "get",
        route: "/notes/:id",
        controller: NoteController,
        action: "findById"
    },
    {
        method: "delete",
        route: "/notes/:id",
        controller: NoteController,
        action: "remove"
    },
];
