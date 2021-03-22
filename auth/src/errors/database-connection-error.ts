import {CustomError} from './custom-error'

export class DatabaseConnectionError extends CustomError{
    statusCode= 500
    reason = 'Can not register. Database Error'
    constructor(){
        super('Error in DB')
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
    serializeError(){
        return [{message: this.reason}]
    }
}   