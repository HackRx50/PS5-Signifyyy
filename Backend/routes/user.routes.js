import express from "express";
const router = express.Router();
import {userLogin, userRegistration} from "../controllers/user.controller.js";

//public routes
router.post('/register', userRegistration)
router.post('/login', userLogin)

export default router