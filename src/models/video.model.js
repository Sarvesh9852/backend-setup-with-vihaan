import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema=({

    videoFile:{
        type: String, // cloudnary se lena h 
        requried: true  

    },
    thumbnail:{
        type: String,
        requried: true
    },
    title:{
        type: String,
        requried: true
    },
    description:{
        type: String,
        requried: true
    },
    duration:{
        type: Number,
        requried: true
    },
    views:{ // views jaruri h or isko initial me 0 rkhenge 
        type: Number, 
        default: 0
    },
    isPublished:{ // video publicly avilable h ya nhi ye dekhne ke liye
        type: Boolean,
        default: true

    },
    owner:{ // hr video ka owner hoga mtlnb jo video upload krega ..to humne howner add kiya h 
        type: Schema.Types.ObjectId,
        ref: "User"


    }

},{timestamps:true})

 // ye ek middleware h ..jese data save or post hone ke baad kuchh kro ..to is type ke midddle ware hum likhenge or sikhenge / ab hum yha khud ke plugin v add kr skte h..querry likh skte h jo aggrigation querry h jo humare project ko next level pe le jata h ..

videoSchema.plugin(mongooseAggregatePaginate) 

export const Video = mongoose.model("Video",videoSchema)








//07 ab hum watchHistory ke liye ab huum kuchh mongoodb querry likhenge lkn uske liye hum install krenge mongose-aggrigate-paginate-v2 .humne install kr liya h ..ye production level pe use hota h me hue hota h ...


//step 1. ab hum ise video file me import krenge
//step 2. ise export krne se pehle hum ise use krenge

// 08 . ab hum bcrypt use krenge ye humare password ko strong bnata h hashed me rkhta h...sbse pehle install kr lenge bcrypt ko 

//09 ab hum token bnayenge iske liye hun jwt ko install krenge ..indono ko hum user file me import krenge....