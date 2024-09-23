import express from "express";
const router = express.Router();
import {changeUserPassword, userLogin, userRegistration, uploadDocument, saveDocument} from "../controllers/user.controller.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

//route level middleware - to protect poute
router.use('/changepassword', checkUserAuth)

//public routes
router.post('/register', userRegistration)
router.post('/login', userLogin)

//Protected route
router.post('/changepassword', changeUserPassword)

//protected route to upload documents
router.route('/upload/doc').post(uploadDocument, saveDocument)

export default router