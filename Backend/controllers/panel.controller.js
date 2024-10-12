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

const panelLogin = async (req, res)=>{

    try {
        const {employeeId, password} = req.body;

        const panel = await Panel.findOne({employeeId});

        const isPasswordCorrect = await bcrypts.compare(password, panel?.password||" ");

        if(!panel || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid user name or Password"});
        }

        generateTokenAndSetCookie(panel._id, res);

        // res.status(200).json;

        res.status(201).json({
            _id: panel._id,
            name: panel.name,
            employeeId: panel.employeeId,
            email: panel.email,
            password: panel.password
        });
        
    } catch (error) {
        console.log("Error in Login controller", error);
        console.log(error);
        res.status(500).send(error.message);
    }
}

const panelLogout = async(req, res)=>{
    try {
        res.cookie("jwt","",{maxAge:0, httpOnly: true });
        res.cookie();
        res.status(200).json({error: "Logout Successfully"});
        
    } catch (error) {
        console.log("Error in Login controller", error);
        console.log(error);
        res.status(500).send(error.message); 
    }
}

export {panelRegistration, panelLogin, panelLogout};
