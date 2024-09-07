import UserModel from '../models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRegistration = async (req, res) => {
    const { name, email, password, password_conf, tc } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.send({ "status": "failed", "message": "email already exists" });
        }

        if (name && email && password && password_conf && tc) {
            if (password === password_conf) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const newUser = new UserModel({
                    name,
                    email,
                    password: hashPassword,
                    tc
                });

                await newUser.save();
                return res.status(201).send({ "status": "success", "message": "registration success" });
            } else {
                return res.send({ "status": "failed", "message": "confirmation password doesn't match" });
            }
        } else {
            return res.send({ "status": "failed", "message": "all fields are required" });
        }
    } catch (error) {
        console.log(error)
        return res.send({ "status": "failed", "message": "unable to register" });
    }
};

export { userRegistration };
