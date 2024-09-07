import express from "express";
import {panelLogin, panelLogout, panelRegistration} from "../controllers/panel.controller.js";
const router = express.Router();

//public routes
router.post('/register', panelRegistration)
router.get('/login', panelLogin)
router.get('/logout', panelLogout)

export default router