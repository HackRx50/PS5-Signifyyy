import mongoose from "mongoose";

// UserInfo Schema
const userInfoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    insurance: { type: String, required: true },
    company: { type: String, required: true },
    documents: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' } // Reference to Document collection
});

// Document Schema
const documentSchema = new mongoose.Schema({
    FIR: { type: [String], default: [] },  
    Claim: { type: [String], default: [] }, 
    Judgement: { type: [String], default: [] }, 
    alarmStatus: { type: Boolean, default: false },  
    notification: { type: String, default: '' }  
});

// Create Models
const UserInfo = mongoose.model('UserInfo', userInfoSchema);
const Document = mongoose.model('Document', documentSchema);

export {UserInfo, Document};