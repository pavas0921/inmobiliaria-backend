import express from "express";
import { createCosigner, getAllCosigners, getCosignerByCedula, updateCosigner } from "../controllers/cosigner.controller.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router()

//Crear un cliente
router.post("/", verifyToken, createCosigner)
//Obtener todos los clientes
router.get("/", verifyToken, getAllCosigners)
//Obtener cliente por cedula
router.get("/:cedula", verifyToken, getCosignerByCedula)
router.put("/:cedula", verifyToken, updateCosigner)

export default router

