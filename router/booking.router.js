const express = require("express");
const { 
    cab_booking,
    booking_status_update 
} = require("../controller/booking")

const bookingRouter = express.Router();

bookingRouter.post("/", cab_booking)
bookingRouter.put("/status/:booking_id/:book_status", booking_status_update)


module.exports = bookingRouter;