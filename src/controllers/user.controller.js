// hum yha ek controller likh rhe h ..to humne asyncHandler name ka ek wrapper file bnaya h kyuki in case agr koi problem aaye to um use hum use kr ske ..iska fayda ye h ki hume hr chij mko promise me nhi dalna pdegA TRY CATCH me nhi dalna padega

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//ab hume method likhna h user register ka ..

const registerUser = asyncHandler(async (req, res)=>{ // humne asyncHandler liya h jo ye ek higher order function h 
 // hum user ko register kr rhe h tomuske steps v likh rhe h sath me ..
 // 1. get user details from frontend 
 // 2. validation :- no empty
 // 3. check if user already exist : - email or user name se checkmkr lenge
 // 4. check for images, check for avatar
 // 5. upload them to claudnary,avatar
 // 6. create user object - create entry in db
 // 7. remove passsword and refresh token from response
 // 8. return response

 // 1. hum ab body se dstructure krenge data ko jo v field diya h humne model me ..
 const {fullname, email, username, password } = req.body // 
 console.log("email", email)

 //02. ab hum validation chek krenge

if(
  [fullname,username,email,password].some((field)=>field?.trim==="")
){
  throw new ApiError(400, "All fields are requried")
}
 //// 3. check if user already exist : - email or user name se checkmkr lenge
 const existedUser = User.findOne({
  $or: [{username}, {email}]
 })
 if(existedUser){
  throw new ApiError(409, "user with email or username already exists")
 }

 // 3. check if user already exist : - email or user name se checkmkr lenge

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 //check krne ke liye ki avatar aaya h ya nhi..
 if(!avatarLocalPath){
  throw new ApiError(400, "Avatar file is require")
 }

 //// 5. upload them to claudnary,avatar import krna hoga cloudinaryonUpload ko 

 const avatar = await uploadOnCloudinary(avatarLocalPath) // upload krne me tyme lgta h to hum ise await ke sath likhte h 

const coverImage = await uploadOnCloudinary(coverImageLocalPath)

// check avatar gya h ya nhi claudnary pe..
if(!avatar){
  throw new ApiError(404,"Avatar file is requried ")
}

//// 6. create user object - create entry in db..mtlb ab jb sara kaam ho gya h database me to ek object bnao or use Dbme entry kr do

const user = await User.create({ // kyuki database se user hi bat krta h or thoda time lgta h is liye hum await v use krenge 
  fullname,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase()

})

// check if user empty or not..
// 7. remove passsword and refresh token from response

const createdUser = await User.findById(user._id).select("-password -refreshToken") // .select iska use hum tb krte h jb hume koi field nhi chAHIYE hoti h..mtlb password or refreshToken hum nhi chahte h to wo nhi aayega..nhi ayega 

//check 
if(!createdUser){
  throw new ApiError(500, "something went wrong while registring the user")
}


 // 8. return response :- to ab humne Apiresponse bnaya thawrapperr to ab use hum yha import kr lenge 

 return res.status(201).json(
  new ApiResponse(200, createdUser, "User registerd sucessfully")
 )



})

export{registerUser}


//08  ab hum routes create krenge..user ka .. route folder me jakr..
