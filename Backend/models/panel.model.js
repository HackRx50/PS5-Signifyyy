import mongoose from "mongoose";


const panelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    employeeId:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
});

const Panel = mongoose.model("Panel", panelSchema);

export default Panel;

// first name last name , employee id ,conff password,  password, office email