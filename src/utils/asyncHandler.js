const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err));
    }
}

export {asyncHandler};

// // iska dusra tadika v hota h jise hum dekhenge ....

// ye bs smjhane ke liye tha .. ki bum aese hi likhenge

// const asyncHandler=()=>{}

// const asyncHandler=(function)=>()=>{}

// // isko async ke sath likhne ka tadika

// const asyncHandler=(function) => async() => {}


    //2nd tadika 

    // const asyncHandler = (fn) => async (req,res,next)=>{
    //     try {
            
    //     } catch (error) {
    //         res.status(err.code || 500).json({
    //             sucess:false,
    //             message: err.message
    //         })
            
    //     }
    // }
