import Panel from "../models/panel.model.js";
import bcrypts from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const panelRegistration = async(req, res)=>{

    // return res.send("fsjkssl");
    try {
        const { name, employeeId, email, password, confPassword } = req.body;

        if(password !== confPassword){
            return res.status(400).json({error: "password don't match"});
        }

        const panel = await Panel.findOne({employeeId});

        if(panel){
            return res.status(400).json({error: "EmployeeId alredy exist pelase Login"});
        }

// Hash Password
        const salt = await bcrypts.genSalt(10);
        const hashedPassword = await bcrypts.hash(password, salt);

        const newPanel = new Panel({
            name,
            employeeId,
            email,
            password: hashedPassword
        })
        
        if(newPanel){

            generateTokenAndSetCookie(newPanel._id, res);

            await newPanel.save();
            res.status(201).json({
                _id: newPanel._id,
                name: newPanel.name,
                employeeId: newPanel.employeeId,
                email: newPanel.email,
                password: newPanel.password
            });
            
        }else{
            res.status(400).json({error: "User provides invalid data"});
        }

    } catch (error) {
        console.log("Error in SignUp controller", error.message);
        console.log(error);
        res.status(500).send(error.message);
    }
}

// first name last name , employee id ,conff password,  password, office email

const panelLogin = (req, res)=>{
    res.send("hi i am panel log in ");
}

const panelLogout = (req, res)=>{
    res.send("hi i am panel log out ");
}

export {panelRegistration, panelLogin, panelLogout};
