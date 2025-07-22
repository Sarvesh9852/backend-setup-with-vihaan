import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()


//05. ab hum configuration krenge cors ka ...

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

//06 ab hum cookie ke option ko v set kr he h ..kyuki deta bht jagh se aayega bakend ke under kuchh log url se bhejenge kuchh log jeson formate me bhejenge kuchh form me bhejenge ..to hum kuchh settings krenge kuchh limits lgayenge kyuki ab hum ye thode hi chahte h ki koi v humne unlimited data na bheje jissse server hi crash ho jay.. to hum kuchh settings krenge 

//configuration krne ke liye hum app.use ka use krenge..

app.use(express.json({
    limit: "16kb"
})) // iska mtlb hum json ko accept kr rhe h or limit set kr rhe h ki kitni limit tk accept krega


// ab hum url se data ke liye bnayenge

app.use(express.urlencoded({extended:true,limit:"16kb"})) // mtlb hum url se data le rhe h ..or extended true ka mtlb ye hua nested obj de...iski jarurat nhi

// ab hum ek static ko configure krenge..jisme hum file folder ko store krna chahte h to hum ek public access bnate h ki koi v access kr lo in case agr jarurat pdi to...

app.use(express.static("public")) // iska mtlb koi v use kr skta h public folder me rkhi chijon ko..

// ab hum cookie parser ko v config krenge..cookie parse ka kaam ye hota h ki server se user ke browser ka cookies access kr pau or cookies set v kr paun..basically humm crud operation perform kr paye..

app.use(cookieParser())


//ye upr humne sqari config kr li h.. ab hum thoda middleware padhenge..bacically middleware ka use hota h user ko chek krna ki user authenticate h ya nhi..ya fir user admin h ya nhi..to hi hum use responce bhejenge wrna nhi bhejenge..middleware basically request or response ke bich kaam krta h..

// ab jo humne req or res padha tha wo basically 4 element leta h err,req,res,next..iska mtlb ya to error hoga ya agr next ki9 baat kre to ye bolega ki sb thk h next part ko kr do ye depend krta h ki hum kitne middleware set kr rhe h uske hisaab se ye next next krta jayega..or next me responce rhega to wo next ko discard kr dega or response bhej dega..


// IMPORTANT POINT// => hum ab utils ka use krenge..jo folder bnaya tha humne src ke under... jb v hum detabase bnate h to hum 2 chijon ka dhayan rkhte h pehla async await or try catch .. to hum hr bar detabase bnayenge tomitna sara code likhna shi nhi hoga ...or ye best practice v nhi h ..to hum kya krte h ki in wraper ka generalize function bna kr (utils) jb v hume ye function bnana ho to hum utils method me function pass kr denge or wo hume execute krke waps de dega.. humne error, response or async ka method bna liya h or ye bht jaruri v h .. ise hume practice krna hoga..



//09. routes import  => generally hum routes ko config ke bad hi likhte h..upr humne configuration kiya h only..

// hum import saperatly v kr skte h ye ek acchi practice h readiblity achhhi hoti h 

import userRouter from './routes/user.routes.js'

// routes declaration ..hum yha app.get pehle likhte the kyuki hum whi pe route v likhrhe the or whi pe controller likh rhe the ..lkn ab wese nhi  nhi likhenge kyuki humne route ko saperate kr diya h router ko nikal kr alg kr diya h to ab hume middleware lana padega ye compulsory h ....to hum app.use ka use krenge.. 

app.use("/api/v1/users", userRouter) // mtlb koi v user /users pe hit krega to hum control de denge userRouter pe..userRouter jayega userRouter file me wha wo dekhega ki kya kaam krna h  ..to ab hum userRouter file me jaa rhe h jo v route pass kranh use likhne 

// ye aese kaam krega..=> http://localhost:8000/api/v1/users/register




export{app}

// jb async method jo v humne bd ke under index.js me bnaya h db ke liye.. jb v comptele hota h to ye promise return krta h..or promise me reject or resolve hote h jise hum .then or .catch se resolve krte h ...to ab hum server ko listen krwayenge iske through..app.listen krke.. main file me jakr..

//06 ab hum user or video ka Schema bnayenge model me jake yiuser or video ka file bna kr 