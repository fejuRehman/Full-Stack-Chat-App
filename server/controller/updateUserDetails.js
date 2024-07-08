const getUserDetailsFromToken = require("../helpers/getUserDetailFromToken")
const userModel = require("../models/UserModel")


async function updateUserDetails(request,response){
    try {
        const token = request.cookies.token || ""

        const user = await getUserDetailsFromToken(token)
        // console.log("user" ,user)
        const { name, profile_pic } = request.body

        const updateUser = await userModel.updateOne({ _id : user._id },{
            name,
            profile_pic
        })

        const userInfomation = await userModel.findById(user._id)

        return response.json({
            message : "user update successfully",
            data : userInfomation,
            success : true
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = updateUserDetails