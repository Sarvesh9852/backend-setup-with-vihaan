// hum yha ek controller likh rhe h ..to humne asyncHandler name ka ek wrapper file bnaya h kyuki in case agr koi problem aaye to um use hum use kr ske ..iska fayda ye h ki hume hr chij mko promise me nhi dalna pdegA TRY CATCH me nhi dalna padega

import { asyncHandler } from "../utils/asyncHandler.js";

//ab hume method likhna h user register ka ..

const registerUser = asyncHandler(async (req, res)=>{ // humne asyncHandler liya h jo ye ek higher order function h 
  return  res.status(200).json({
        message: "ok"
    })
})

export{registerUser}


//08  ab hum routes create krenge..user ka .. route folder me jakr..
