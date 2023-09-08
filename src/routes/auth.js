import express from 'express';
import UserController from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Method: GET
// http://localhost:8000/users
router.get('/users', auth, UserController.getUsers);

// Method: POST
// http://localhost:8000/register
router.post('/register', UserController.register);

// Method: POST
// http://localhost:8000/login
router.post('/login', UserController.login);

// Method: DELETE
// http://localhost:8000/logout
router.delete('/logout', UserController.logout);

// Method: GET
// http://localhost:8000/token
router.get('/token', UserController.generateAccessToken);

export default router;
