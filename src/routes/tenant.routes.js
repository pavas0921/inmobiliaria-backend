import express from "express";
import { createTenant, getAllTenants, getTenantByCedula } from "../controllers/tenant.controller.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router()

//Crear un cliente
router.post("/", verifyToken, createTenant)
//Obtener todos los clientes
router.get("/", verifyToken, getAllTenants)
//Obtener cliente por cedula
router.get("/:cedula", verifyToken, getTenantByCedula)

export default router

