class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message) // ye Error class ka constructor hai jisse ye inherit kiya hai
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = ErrorHandler