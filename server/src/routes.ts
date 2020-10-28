import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload'
import UserController from './controllers/UserController';
import UserAdmController from './controllers/UserAdmController';

const routes = Router();
const upload = multer(uploadConfig)

routes.post('/user', upload.single('path'), UserController.create);
routes.post('/user/auth', UserController.authenticate);

routes.get('/user/adm', UserAdmController.index);
routes.get('/user/:id', UserController.show);

routes.put('/user/:id', UserController.alter);
routes.put('/user/adm/:id', UserAdmController.alter);
routes.put('/user/online/:id', UserController.online);

export default routes;