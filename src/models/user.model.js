import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({

    username:{
        type: String,
        requried: true,
        unique: true,
        trim: true,
        index: true // search krne ke liye index ko true kiya h humne ..detabase se searching ke liye
    },
    email:{
        type: String,
        requried: true,
        unique: true,
        trim: true,
       
    },
     fullname:{
        type: String,
        requried: true,
        trim: true,
        index:true
       
    },
     avatar:{
        type: String, // image ko claudnary pe upload krke usse image ka string le lenge ids liye image ko string likhte h 
        requried: true,
       
    },
     coverImage:{
        type: String, 
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
     password:{
        type: String,
        requried: [true, 'password is true'] // hum sare true ko array me likh skte h ek se jyada agr likhna ho to
    },
    refreshToken:{ // isko detail me padhna h ..pehle hum video model bna lete h 
        type: String,
    }



},{timestamps:true})

// jb v data save ho usse pehle ka kaam 

// humne callback ka use nhi kiya lkn arrow fun is liye use nhi kiya kyuki this ka refrence nhi hota... use context nhi pta hota h...or hume context ki jarurat h kyuki save event user pe chl rha h is liye normal function ka use kiya h..ab ye thoda complex process h is liye hum isme async await v lgayenge ...
// ab humne padha h middle ware me eror req,res, next ka ...or middle ware ke flag me next ka referance to hona hi chahiye is liye humne ise function me likha h ..ab jb next ka kaam ho jayega to hum aage call krenge ki ab kaam ho gya h

userSchema.pre("save", async function(next) {
    if(!this.modified("password")) next();
    this.password = bcrypt.hash(this.password,10) //jb v data save ho rha ho usme se password ko lo encrypt krke save kr do..this.password use kiya h password ko access krne ke liye or us password ko encrypt krne ke liye bcrypt.hash use kiya or rounds ke liye humne 10 use kiya 
    next() // jb kaam ho jaY TO NEXT PE AA Jao.. 
})
//ek problem aa gai h jb v data save krenge hr baar ye password ko save krega..to hum ye krenge ki jb v koi password field me change kre jese password update, first time password change tb hi ye code run kro wrna mt kro...to humek if condition likhenge..ki kya wo modified h ya nhi to hum ase krenge check if(!this.modified("password")) next(); agr modified nhi hua h to pre nhi lgega ..agr modifie hua h to bcrypt walacode chl jayega


// ab hum ye chahte h ki jo user h usne password dala h wo shi h ya nhi h ... to uske liye v hum ek method bnayenge .. wo v custom methods..hum likhenge ki password correct h ya nhi ..hum koi v methods bna skte h ..async me data h kyuki time v lg skta h.. function me ek password lgega.kyuki password to chek krna pdega is liye humne use kiya ,,

userSchema.methods.isPasswordCorrect = async function (password){
    //logic password check krne ka ..hum bcrypt library se password chek kr skte h ye password ko hash v krti h or chek v krta h compare krke is liye humne compare method use kra h ..ek jo user bhej rha h ek jo db me store h usse ..humise sida hi return ke denge ..return me compare hota h true or false

  return await bcrypt.compare(password, this.password)


}

// ab hum access or refresh token generate krne ka v method likhenge same hi tadike se jesa humne upr likha h ...method ka naam hum kuchh v de skte h..

userSchema.methods.generateAccessToken = function () {

    // ab hum token generate krenge jwt.sign mrthod se .. hum jo v information chahte h wo likhenge ab 
   return jwt.sign(
    {

        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname


    },
    // ab access token lgta h isme to wo denge hum..or dusra object lgta h ....kyuki expiry object ke under jata h ..generate ho jane ke bad ye return krta h is liye humne return likh diya...jwt ke aage .....
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

// humara refresh token v isi trh se generate hota h same hii tadike se..to exact hum copy paste kr denge 

userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
         _id: this._id,
        
        },

         process.env.REFRESH_TOKEN_SECRET,

         {
             expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
         }
   

    )


    
}

export const User = mongoose.model("User",userSchema)



// jwt or bcrypt ko use krne ka tadika iske liye hum mongoose ke kuchh hookks ka use krenge .. unme se ek hook hota h pre hook .. ye ek middleware h .. iska mtlb ye hua ki jb deta save ho usse pehle hum chahte h ki password ko encrypt kr den..



// 09 ab hum jwt ko use krenge.. 

// jwt humara bearer token h .. iska mtlb jiske pas v token hoga use hum data bhej denge.. mtlb ye ek mele ke pas ki trh h .. jiske pas v mele ka pass hoga wo aaram se mela ghum skta h 

// ye chije hum humesha environment ke under likhte h => ACCESS_TOKEN_SECRETS= HBDSYUFGEWIDJ34Y8767KJECR2E8T67TE672839  or dusra hota h ACESS_TOKEN_EXPIRY = 1D .. REFRESH_TOKEN_SECRETS = 1243@#2325$%, REFRESH_TOKEN_EXPERY = 10D...

// hum refresh token expory ko humesha long lasting dete hh 

// hum ise small laters me v likh skte h lkn caps me is liye likha kyuki ye ek stender practice h ..
