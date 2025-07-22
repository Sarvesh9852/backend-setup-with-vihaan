import multer from "multer"; // hum koi v file multer ke through hi upload krte h

const storage = multer.diskStorage({ // hum yha disc storage use kr rhe h kyuki memory storage storage bht jyadfa consume krega ..file bdi chhoti v  ho skti h is liye achha h ki hum disc storage hi use kre
  destination: function (req, file, cb) { // yha hume file milta h ..jb v file aaye request me to ye multer easily handle kr leta h ..hume json deta ka rquesdt easily mil jata h.. express ke through.. lkn jb v user se through file v aa rhi h is liye hi multer ka use hota h.. 
    cb(null, 'public\temp')
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname) // originalname is liye rkha ki jo v user ne  upload kra tha wo hi original name hume bta do 
  }
})

export const upload = multer({ storage, })

// humari configuration ho chuki h ..


//07 ab hum user ke register ke liye controller bnayenge....