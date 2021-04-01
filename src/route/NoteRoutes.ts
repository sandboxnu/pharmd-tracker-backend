import NoteController from '../controller/NoteController';
import Config from './Config';

const BASE_PATH = '/notes';

const NoteRoutes = [
  {
    method: Config.GET,
    route: BASE_PATH,
    controller: NoteController,
    action: 'filter',
  },
  {
    method: Config.POST,
    route: BASE_PATH,
    controller: NoteController,
    action: 'save',
  },
  {
    method: Config.PUT,
    route: `${BASE_PATH}/:id`,
    controller: NoteController,
    action: 'save',
  },
  {
    method: Config.PATCH,
    route: `${BASE_PATH}/:id`,
    controller: NoteController,
    action: 'update',
  },
  {
    method: Config.GET,
    route: `${BASE_PATH}/:id`,
    controller: NoteController,
    action: 'findById',
  },
  {
    method: Config.DELETE,
    route: `${BASE_PATH}/:id`,
    controller: NoteController,
    action: 'remove',
  },
];

export default NoteRoutes;
