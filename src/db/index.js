//sbse pehel hum mongoose ko import krenge kyukidara deta mongoose se hi aata h ..
// uske bad detabase ka name ko import krenge..

import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

// hum detabase ka function bnayenge..

const connectDB = async() => {
    try {
     const connectionInstance  = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`) // yha humne uri or database ka name diya h jo v bnaya h or ise hum ek variable me store kr skte h kyuki mongoose hume return me ek object deta h 
     console.log(`\n MongoDB connected !! DB HOSt: ${connectionInstance.connection.host}`) //iska mtlb jha v md url h wo pura lelo iska mtlb jha v mangoodb ka url h wha se pura utha lo kyuki database production ka alg hota h, development ka alg hota, testing ka alg hota h ..iska ek mtlb hota h ki kon se host se m connect ho rha hun..
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED",error)
        process.exit(1) // hum throw.err v likh skte h lkn yha hum ye process.exit(1) likh rhe h kim error aayega to 1 aa ajyega
        
    }
}

export default connectDB