import UserModel from '../models/user.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
    static userRegistration = async (req, res) => {
        const {name, email, password, password_conf, tc} = req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed", "message":"email already exists"})
        }
        else{
            if(name && email && password && password_conf && tc){
                if(password === password_conf){
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const doc = new UserModel({
                            name:name,
                            email:email,
                            password:hashPassword,
                            tc:tc
                        })
                        await doc.save()
                        res.status(201).send({"status":"success", "message":"registration success"})
                    } catch (error) {
                        res.send({"status":"failed", "message":"unable to register"})
                    }
                }
                else{
                    res.send({"status":"failed", "message":"confirmation password doesn't match"})
                }
            }
            else{
                res.send({"status":"failed", "message":"all fields are required"})
            }
        }
    }
}


export default UserController