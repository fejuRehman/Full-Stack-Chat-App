const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name :{
         type : String,
         required: [true,"Username is required"]
    },
    email :{
         type : String,
         required :[true ,'Email is required'],
         unique :true
    },
    password :{
         type :String,
         required : [true,"Password is required"]
    },
    profile_pic :{
         type: String,
         default : ""
    }

},{timestamps:true})


const userModel=mongoose.model('User',userSchema)

module.exports=userModel






