class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [], //agr error jyada h to hum array me v likh skte h 
        stack = "" // ye v ek error hi hota h 

    ){
        // yha over ride ho rha h is liye hum super call kr rhe h   hum yhaniche override kr rhe h sare field ko constructor se 
        super(message)
        this.ststusCode = statusCode
        this.data = null
        this.message = message
        this.sucess = false;
        this.errors = errors

        if (stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }

}

export {ApiError}