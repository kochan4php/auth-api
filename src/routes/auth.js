import express from 'express';
import UserController from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/users', auth, UserController.getUsers);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.delete('/logout', UserController.logout);
router.get('/token', UserController.generateAccessToken);

export default router;
