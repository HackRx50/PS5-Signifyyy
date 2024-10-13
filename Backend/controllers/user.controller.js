import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from 'fs'
import path from 'path'
import {DocDocument} from '../models/user.js';  // Assuming Document schema is in models/Document.js
import {UserModel } from '../models/user.js';  // Assuming UserInfo schema is in models/UserInfo.js
import {spawn} from 'child_process'

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


const getPara = async(req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db('uploadedPDF'); // Database name
    const collection = database.collection('Hackrx'); // Collection name

    // Get all documents from the collection
    const data = await collection.find({}).toArray();

    // Send the data as JSON response
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
  } finally {
    // Ensure client will close when you finish/error
    await client.close();
  }
}

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





const runPy = () => {
  const pythonProcess = spawn('python', ['D:/Learn MERN/HackRx/model/model/feature.py']); // Replace with your script's path

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python Output: ${data.toString()}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script finished with code ${code}`);
    });
}


const saveDocument = async (req, res) => {
  try {
    const { file } = req;
    const email = req.body.email;
    console.log(req.body.email, req.file)
    if (!file) {
      return res.status(400).send({ message: "Please upload a document" });

    }


    const saveFolder = 'D:/Learn MERN/HackRx/model/data/data';
  
      // Ensure the folder exists
      if (!fs.existsSync(saveFolder)) {
        fs.mkdirSync(saveFolder, { recursive: true });
      }
  
  
      // Decode the base64 string
      const base64Data = req.file.buffer; // Remove any header if present
  
      // Define the file path where the PDF will be saved
      const filePath = path.join(saveFolder, email + ".pdf");
  
      // Write the decoded file to the desired location
      fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
          return res.status(500).send('Error writing file.');
        }

        runPy()
      })

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
    
      //writing file

    res
      .status(201)
      .send({
        message: "Document uploaded successfully"      
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
  saveDocument
};
