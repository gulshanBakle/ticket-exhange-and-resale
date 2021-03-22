import express, {Response, Request} from 'express'
import {body, validationResult} from 'express-validator'

const router = express.Router()

router.get('/api/users/signin', ()=>{})
export {router as signinRouter};