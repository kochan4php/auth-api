import express from "express";
import usersController from "../controllers/usersController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/users", verifyToken, usersController.getUsers);
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.delete("/logout", usersController.logout);
router.get("/token", usersController.generateAccessToken);

export default router;
