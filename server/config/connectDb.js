const mongoose=require('mongoose')

async function connectDB(){
     try{
           await mongoose.connect(process.env.MONGODB_URL)

           console.log("db connected successfully")
     }
     catch(err){
         console.log("something is wrong : ",err)
     }
}

module.exports=connectDB