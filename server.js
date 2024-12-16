const dotenv = require("dotenv").config(); // env
const express = require('express');
var https = require('follow-redirects').https;
var fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const {pool} = require("./config/db")
const { setupSocket, getSocket } = require("./socket")
const { notFound,errorHandler } = require("./middleware/errorHandler")
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json({extented:true}))

const port = process.env.PORT || 4000

const http = require("http")
const server = http.createServer(app)

setupSocket(server)

// router
const auth = require("./router/auth.router")
const appRouter = require("./router/bus.router");
const trainRouter = require("./router/train.router");
const cabRouter = require("./router/cab.router");
const bookingRouter = require("./router/booking.router");

const exp = require("constants");


app.use("/auth", auth)
app.use("/bus", appRouter)
app.use("/train", trainRouter)
app.use("/cab", cabRouter)
app.use("/api/cab/booking", bookingRouter)


app.use(notFound)
app.use(errorHandler)


server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${port}`);
});
