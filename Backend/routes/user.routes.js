import express from "express";
const router = express.Router();
import {changeUserPassword, userLogin, userRegistration, uploadDocument, saveDocument, docUpload} from "../controllers/user.controller.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

//route level middleware - to protect poute
router.use('/changepassword', checkUserAuth)

//public routes
router.post('/register', userRegistration)
router.post('/login', userLogin)

//Protected route
router.post('/changepassword', changeUserPassword)

//route to save file as byte64 string
router.post('/submit-document', docUpload)

//protected route to upload documents
router.route('/upload/doc').post(uploadDocument, saveDocument)

export default router