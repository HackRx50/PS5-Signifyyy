import express from "express";
import {panelLogin, panelLogout, panelRegistration} from "../controllers/panel.controller.js";
const router = express.Router();

//public routes
router.post('/register', panelRegistration)
router.post('/login', panelLogin)
router.post('/logout', panelLogout)

export default router