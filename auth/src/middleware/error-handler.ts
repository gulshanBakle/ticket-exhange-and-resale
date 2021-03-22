import {Request, Response, NextFunction} from 'express'
import {CustomError} from '../errors/custom-error'

export const errorHandler = (err:Error, req:Request, res:Response, next: NextFunction)=>{
    if (err instanceof CustomError){
        return res.status(400).send({errors: err.serializeError()})
    }
    // if (err instanceof DatabaseConnectionError){
    //     return res.status(500).send({errors: [{message: err.reason}]})
    // }
    // res.status(400).send({errors: [{message: 'Something unknown went wrong:('}]})

}