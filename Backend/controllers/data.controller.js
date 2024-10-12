import express from 'express';
import mongoose from 'mongoose';
import {DocDocument} from './models/user.js';  // Assuming Document schema is in models/Document.js
import {UserModel } from './models/user.js';  // Assuming UserInfo schema is in models/UserInfo.js

const app = express();
app.use(express.json()); // To parse JSON bodies

// API endpoint to submit documents
app.post('/submit-document', async (req, res) => {
    try {
        const { userId, FIR, Claim, Judgement } = req.body; // Destructure request body
        
        // Find the user by ID
        const user = await UserInfo.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new document with the provided data
        const newDocument = new Document({
            FIR: FIR || [],            // Default to an empty array if FIR is not provided
            Claim: Claim || [],        // Default to an empty array if Claim is not provided
            Judgement: Judgement || [] // Default to an empty array if Judgement is not provided
        });

        // Save the new document to the database
        const savedDocument = await newDocument.save();

        // Associate the document with the user and update their record
        user.DocDocument = savedDocument._id;
        await UserModel.save();

        // Return the claim number and success response
        return res.status(201).json({
            message: 'Document submitted successfully',
            claimNumber: savedDocument.claimNumber
        });
    } catch (error) {
        console.error('Error submitting document:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/insurance-db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(error => console.error('Error connecting to MongoDB:', error));

