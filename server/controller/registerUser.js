const userModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs')
const registerUser=async (req,res)=>{
     try{  
           console.log("req.body ",req.body)
           const {name,email,password,profile_pic}=req.body;
           const checkEmail=await userModel.findOne({email})

           if(checkEmail){
                 return res.status(400).json({
                     message : "User already exist",
                     success :true
                 })
           }

           // password into hashpassword
           const salt=await bcryptjs.genSalt(10);
           const hashpassword=await bcryptjs.hash(password,salt)
           
           const payload={
                ...req.body,
                password:hashpassword
           }
           
           const user=new userModel(payload)
           const userSave=await user.save()
           console.log("user",userSave)
           return res.status(200).json({
                message : "User created successfully",
                data : userSave,
                success :true,
                error :false
           })


     }
     catch(err){
         return res.status(500).json({
             message : err.message || err,
             error:true
         })
     }
}

module.exports=registerUser