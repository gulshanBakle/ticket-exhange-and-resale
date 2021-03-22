import {CustomError} from './custom-error'
export class RouteNotFoundError extends CustomError{
    statusCode= 204
    reason= 'Route not found'
    constructor(){
        super('Invalid route!')
        Object.setPrototypeOf(this, RouteNotFoundError.prototype)
    }
    serializeError(){
        return [{message: this.reason}]
    }
}