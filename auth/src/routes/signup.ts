import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import jwt from 'jsonwebtoken';
import {User} from '../models/user'
import {validateRequest} from '../middleware/validate-request'
import {BadRequestError} from '../errors/bad-request-error';

// import {DatabaseConnectionError} from '../errors/database-connection-error'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
    .isEmail()
    .withMessage('Email must be a valid entry'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between length 4 and 20 chars')
],
validateRequest,
async (req:Request, res:Response)=>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    if (existingUser){
        throw new BadRequestError('This email is already registered.')
    }
    const user = User.build({email, password})
    await user.save()

    //Generate JWt
    const userJwt = jwt.sign({
        id:user.id,
        email: user.email
    }, process.env.JWT_KEY!)

    //store it in session object
    req.session = {
        jwt: userJwt
    }


    res.status(201).send(user)
})
export {router as signupRouter};