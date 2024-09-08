import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'

var checkUserAuth = async(req, res, next) =>{
    let token
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try {
            //get token from header
            token = authorization.split(' ')[1]
            
            //verify token
            const {usedID} = jwt.verify(token, process.env.JWT_SECRET_KEY)

            //get user from token
            req.user = await UserModel.findById(usedID).select('-password')
            // console.log(req. user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({"status":"failed", "message": "unautherised user"})
        }
    }

    if(!token){
        res.status(401).send({"status":"failed", "message": "unautherised user, No token"})
    }

}

export default checkUserAuth