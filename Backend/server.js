import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/user.routes.js'

dotenv.config();

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//CORS policy
app.use(cors())

//Database connection
connectDB(DATABASE_URL)

//JSON
app.use(express.json())

//load routes
app.use("/api/user", userRoutes)

app.listen(port, ()=>{
    console.log(`server linstening at http://localhost:${port}`)
})