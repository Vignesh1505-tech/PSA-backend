const dotenv = require("dotenv").config()

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



async function sendOtp(mobile_no, otp) {
    try {
        const message = await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile_no,
            body: `Your OTP is: ${otp}`
        });
        console.log("Message sent with SID:", message.sid);
        return true; // Indicate that the OTP was sent
    } catch (error) {
        console.error("Error sending OTP:", error);
        return false; // Indicate failure in sending OTP
    }
}

module.exports = { sendOtp };
