import Panel from "../models/panel.model.js";

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

        const newPanel = new Panel({
            name,
            employeeId,
            email,
            password
        })

        await newPanel.save();

        res.status(201).json({
            _id: newPanel._id,
            name: newPanel.name,
            email: newPanel.email,
            password: newPanel.password
        })
    } catch (error) {
        console.log("Error in SignUp controller", error.message);
        console.log(error);
        res.status(500).send(error);
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
