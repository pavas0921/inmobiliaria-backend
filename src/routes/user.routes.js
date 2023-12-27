import express from "express";
import { createUser, getUserById, getUsers, login, updateUser } from "../controllers/user.controller.js";
import { generateToken } from "../helpers/generateToken.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router();

//create user
router.post("/", createUser);
//Login
router.post("/login", login, generateToken);
//Obtener todos los usuarios
router.get("/", verifyToken, getUsers);

router.get("/:_id", getUserById);

router.put("/:_id", updateUser);


export default router;