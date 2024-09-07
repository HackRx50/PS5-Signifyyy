import express from "express";
const router = express.Router();
import {userRegistration} from "../controllers/user.controller.js";

//public routes
router.post('/register', userRegistration)

export default router
