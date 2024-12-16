const express = require("express")
const {sendOtpApi,verifyOtp,UserTokenUpdate,UserNameUpdate } = require("../controller/auth")
const { refreshController } = require("../utils/refresh.token")
const { auth_user } = require("../middleware/authenticate")


const auth = express.Router();


auth.post("/sendOTP", sendOtpApi)
auth.post("/verifyOTP", verifyOtp)
auth.post("/user/token/update", UserTokenUpdate)
auth.put("/user/name/update", UserNameUpdate)




//refresh token api
auth.post("/refreshToken", refreshController)

auth.get("/sample",auth_user,(req,res)=>{
    res.send("Welcome")
})



module.exports = auth;