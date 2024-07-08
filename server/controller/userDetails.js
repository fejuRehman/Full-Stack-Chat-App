const getUserDetailsFromToken = require("../helpers/getUserDetailFromToken")

async function userDetails(req,res){
     try{
          const token=req.cookies.token || ""
        //   console.log("token: ",token)
          const user=await getUserDetailsFromToken(token)
          
         res.json({
             message:"user details",
             data:user,
             success:true,
             error:false
         })
     }
     catch(err){
         res.status(500).json({
             message : err.message || err,
             success:false,
             error:true
         })
     }
}


module.exports=userDetails





