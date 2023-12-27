import express from "express";
import { createOwner, getAllOwners, getOwnerByCedula } from "../controllers/owner.controller.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router()

//Crear un cliente
router.post("/", verifyToken, createOwner)
//Obtener todos los clientes
router.get("/", verifyToken, getAllOwners)
//Obtener cliente por cedula
router.get("/:cedula", verifyToken, getOwnerByCedula)

export default router

