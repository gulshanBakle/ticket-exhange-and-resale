import {ValidationError} from 'express-validator'
import {CustomError} from './custom-error'
export class RequestValidationError extends CustomError{
    statusCode= 400;
    
    //public errors: ValidationError[] is a way of annotating errors value with type!
    constructor(public errors:ValidationError[]){
        super('Invalid field params')
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    serializeError(){
        return this.errors.map(err=>{
            return {message: err.msg, field: err.param}
        })
    }
}