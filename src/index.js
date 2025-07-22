// require ('dotenv').config({path: '.env'}) // ye v ek tadika h lkn isme require lga h jisse consistency khraab ho jata h is liye hum import use


// import mongoose from "mongoose"; ye to pehel wale connection ke liye h is liye humne ise comment kr diya h....
// import { DB_NAME } from "./constants";

import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv' //0_02 isme config file v dena pdta h ..// isko chlane ke e liye hume package.json me jakr kuchh cahnges krna pdega as a experimental feature => "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js".


dotenv.config({
    path: '.env'
})

connectDB()

// 03 isse server pe chlaya humne 


.then(()=>{
  app.listen(process.env.PORT || 5000, ()=>{
    console.log(`server is listning port ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log('mongodb connection failed',err)
})



//04 ab hum thoda middleware ka use krenge.. jb v khi se data hum lete h wo request.param se aata h or dusra h request.body jise alg alg form me data aa skta h ..form me json me to uske liye hume thodi cinfigration krni pdti h or humara kaam ho jata h .....data hum cookies se v le skte h ..to hume cookie-parser install krni pdegi..or ek krenge cors iski help se hum setting krenge cross origin resourse ko ..

// or iske liye hum app.use ka use krenge....jb hum midddleware ko use krte h to app.use ke sath use krte h 

// import krenge app.js me dono ko..


















//02.  hum ise ab dusre or proffessional tadik se krenge ...db folder me ek index.js naam kibfile bna kr usme detabase ka connectivity ka code likh kr use export kra kr main file me import kra kr use use kr le....


// ye pehla tadika hua db connection ka jo ki achha tadika nhi h .... ab hum ise dusre tadike se connect krenge..






// detabase se hum jb v baat krne ki kosis krte h to problems aa skti h ..to ise hum try catch me wrap kr lenge jisse agr koi v problem aai to resolve ho jayegi..

// humdeta base se jb v baat krte h usme time  lgta h to is liye hum async or await ka use krte h or ye jaruri v h ...

// yha hum function bna kr v db connect krwa skte h like function connectDb(){} -> next line connectDb..lkn hum isse v achha approact likh skte h hum yha "effy" ka use krenge (()=>{})() => pehla () function jisme hum arrow function diya or dusra() immideatly execute kr do..to hum niche whi kr rhe h ..


/*




import express from 'express'
const app=express();

(async()=>{ 
    try{
      await   mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

      app.on("error", (error)=>{  // app.on is liye lgaya kyuki ho skta h ki db connect nhi hua to ye error btayegaa..  
        console.log("ERR", error);
        throw error
      })
      app.listen(process.env.PORT, ()=>{
        console.log(`app is listning port${process.env.PORT}`);
      })

    }catch(error){
        console.log("Error: ", error)
        throw err

    }
})()
    */