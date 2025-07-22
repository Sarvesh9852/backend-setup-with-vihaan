// hum yha ek router bnayenge... pehle bum router ko import krenge ..ye ecpress ke sath hi milta h ..

import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


// hum jese express se app bna rhe the same wese hi hum router se route bnayenge....

const router = Router()

// yha hum register ka route likhenge.. kyuki humne register ke route pe user ko lekr jana h register ke liye..
router.route("/register").post(  // // yha humne ek route bnaya registerUser ka 
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    
    registerUser
)    

export default router;


//09.... ab hum router or controller ko import krenge  ..hum chahe to ise main file me v kr skte h import but normally hum main file ko blank hi rkhte h .. is liye isko hum app me use krenge ...