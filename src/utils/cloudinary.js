// cloudnary ek service h jo file ko apne server pe upload krti ..hum multer ka use krte hue user se file lenge or use local server pe temperorily rkh denge ....uske bad hum cloudnary ka use krte hue us file ko localserver se lenge uske bad use hum server pe dal denge

// agr hume claudnary ki jarurat padi to hi hum claudnary ka use krenge.. iska si,ple goalh ki files huari aayegi files system ke through mtlb file server pe alredy upload ho gai h uska ye local path dega..or hum use claudnary pe dal denge ..agr sucessfully file upload ho gai h to to ab hume uski jarurat h nhi to hum use remove kr denge..

import { v2 as cloudinary } from 'cloudinary'; 
import fs from 'fs'

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // hum ise apne according v dal skte h or humne dala v h ..or insbko .env me rkh diya h 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // file upload krne ke liye hum yha ek method bna rhe h 

    const uploadOnCloudinary = async(localFilePath) =>{ // hum parameter ka naam kuchh v rkh skte h basically ye path hota h file ka..
        try {
             if(!localFilePath) return null
         // upload the file on cloudinary

       const response =  await cloudinary.uploader.upload(localFilePath,{ // file upload hone me tym lgega is liye humne await lgaya
            resource_type: "auto" // mtlb jo vfile hogi auto detect krke le lega..
         })
         // console krwa ke dekh lenge ki file sucessfully uploadhui h ya nhi..
         console.log("file is uploaden on cloudinary",response.url); // hume response ke sathj url chahiye is liye humne ise console me likha h 
         return response  // fir hum user ko return kr dete h response jo v user ko data chahiye
            
        } catch (error) { // catch ka use jb file upload nhi hui h to v catch ka use hoga or lkn koi v c;laudnary ko use kr rha h to mujhe itna pta h ki wo file server pe h lkn wo sucessfully upload nhi hua h us e hum unlink kr denge..mtlb for the safe purpose hum use server se hta denge 
            fs.unlinkSync(localFilePath) // remove the locally saved temperory file as the upload operation got failed
            return null;
            
        }
       
    }
    
    export {uploadOnCloudinary}


    // ab hum ek middleware bnayenge multer ka use krke ..hum direct v likh skte h lkn humedum production based code likhenge..jha jha hume file upload ki  ki jarurat hogi wha wha hum multer ko inject kr denge..is liye hum ise saperate bna rhe h as as middleware 

    // hum middleware ke under ek multer ka middleware bnayenge fir use import krenge..