import express from "express";
import usersController from "../controllers/usersController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Method: GET
// http://localhost:8000/users
router.get("/users", verifyToken, usersController.getUsers);

// Method: POST
// http://localhost:8000/register
router.post("/register", usersController.register);

// Method: POST
// http://localhost:8000/login
router.post("/login", usersController.login);

// Method: DELETE
// http://localhost:8000/logout
router.delete("/logout", usersController.logout);

// Method: GET
// http://localhost:8000/token
router.get("/token", usersController.generateAccessToken);

export default router;
