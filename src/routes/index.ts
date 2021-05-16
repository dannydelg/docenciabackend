import {Router} from 'express';
import auth from './auth';
import files from './files';
import user from './user';

const routes = Router();
//localhost:3000/auth/login
routes.use('/auth', auth);
//localhost:3000/users
routes.use('/users', user);

routes.use('/api/aspirante', files);

routes.use('/api/carreras', files)

export default routes;