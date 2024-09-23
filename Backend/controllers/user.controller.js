import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadDocument = upload.single("document");

const userRegistration = async (req, res) => {
  //sign up
  const { name, email, password, password_conf, tc } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.send({ status: "failed", message: "email already exists" });
    }

    if (name && email && password && password_conf && tc) {
      if (password === password_conf) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
          name,
          email,
          password: hashPassword,
          tc,
        });

        await newUser.save();
        const saved_user = await UserModel.findOne({ email: email });

        //Genereate JWT token
        const token = jwt.sign(
          { usedID: saved_user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );

        return res
          .status(201)
          .send({
            status: "success",
            message: "registration success",
            token: token,
          });
      } else {
        return res.send({
          status: "failed",
          message: "confirmation password doesn't match",
        });
      }
    } else {
      return res.send({ status: "failed", message: "all fields are required" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ status: "failed", message: "unable to register" });
  }
};

const userLogin = async (req, res) => {
  //login
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          //Generate JWT token
          const token = jwt.sign(
            { usedID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.send({
            status: "success",
            message: "login success",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "email and password doesn't match",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "you are not a registered user",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", message: "unable to login" });
  }
};

const changeUserPassword = async (req, res) => {
  const { password, password_conf } = req.body;
  if (password && password_conf) {
    if (password !== password_conf) {
      res.send({
        status: "failed",
        message: "password and confirm password deosnt match",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);
      await UserModel.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword },
      });
      return res.send({
        status: "success",
        message: "password changed successfully",
      });
    }
  } else {
    res.send({ status: "failed", message: "All fields required" });
  }
};

const saveDocument = async (req, res) => {
  try {
    const { file } = req;
    const email = req.body.email;
    console.log(req.body.email, req.file)
    if (!file) {
      return res.status(400).send({ message: "Please upload a document" });
    }

    // Create a new document record with binary data
      const updateUser = await UserModel.findOneAndUpdate(
        { email: email },
        {
            // Update fields: filename and documentData
            filename: `${email}.pdf`,
            documentData: req.file.buffer
        },
        { new: true }
      );

    res
      .status(201)
      .send({
        message: "Document uploaded successfully",
        document: updateUser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error uploading document", error });
  }
};

export {
  userRegistration,
  userLogin,
  changeUserPassword,
  uploadDocument,
  saveDocument,
};
