import mongoose from "mongoose";

//defining schema
const userSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    password:{type:String, required:true, trim:true},
    tc:{type:Boolean, required:true},
    filename: {
        type: String,
        default: ""
    },
    documentData: {
        type: Buffer,
        default: null
    },
    documents_id6: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' } // Reference to Document collection
})

// Document Schema
const Document = new mongoose.Schema({
    FIR: { type: [String], default: [] },  
    Claim: { type: [String], default: [] }, 
    Judgement: { type: [String], default: [] }, 
    claimNumber: { type: String, unique: true },  // Unique Claim Number
    alarmStatus: { type: Boolean, default: false },  
    notification: { type: String, default: '' }  
});

//model
const UserModel = mongoose.model("user", userSchema)
const DocDocument = mongoose.model("DocDocument", Document)

export {DocDocument, UserModel};