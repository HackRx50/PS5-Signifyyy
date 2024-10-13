import express from 'express';
const router = express.Router();
import {changeUserPassword, userLogin, userRegistration, uploadDocument, saveDocument} from "../controllers/user.controller.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import {MongoClient} from 'mongodb'


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

//route level middleware - to protect poute
router.use('/changepassword', checkUserAuth)

//public routes
router.post('/register', userRegistration)
router.post('/login', userLogin)

//Protected route
router.post('/changepassword', changeUserPassword)

//protected route to upload documents
router.route('/upload/doc').post(uploadDocument, saveDocument)


router.route('/getData').post(async (req, res) => {
    try {
        let db = client.db('Hackrx');
        const collection = db.collection('uploadedPDF'); // Now collection is "uploadedPDF"
        const lastDocument = await collection
          .find({})
          .sort({ _id: -1 }) // Sort by _id in descending order (most recent first)
          .limit(1) // Limit to one document
          .toArray(); // Convert the result to an array
    
        if (lastDocument.length === 0) {
          return res.status(404).json({ error: 'No documents found in the "uploadedPDF" collection' });
        }
    
        res.json(lastDocument[0]); // Send the last document as JSON
      } catch (err) {
        console.error('Error fetching last document:', err);
        res.status(500).json({ error: 'Failed to fetch the last document from MongoDB' });
      }
  });

//route to get the document data
router.get('/getData', async (req, res) => {
    try {
      // Connect to MongoDB
      await client.connect();
      const database = client.db('Hackrx'); // Database name
      const collection = database.collection('uploadedPDF'); // Collection name
  
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
  });

export default router