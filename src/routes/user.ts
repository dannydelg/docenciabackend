import {Router} from 'express';
import { UserController } from './../controller/UserController';
import {checkJwt} from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

const router = Router();

// GET ALL USERS
//router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll);

router.get('/', UserController.getAll);

//GET A SINGLE USER
router.get('/:id', UserController.getById);

//CREATE A NEW USER
router.post('/', UserController.newUser);

//UPDATE A USER
router.patch('/:id', UserController.editUser);

//DELETE A SINGLE USER
router.delete('/:id', UserController.deleteUser);

export default router;
