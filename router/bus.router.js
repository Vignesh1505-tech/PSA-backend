const express = require("express");
const { addBus, searchBus } = require("../controller/bus")
const busRouter = express.Router();

busRouter.post("/addBus", addBus)
busRouter.post("/searchBus", searchBus)

module.exports = busRouter;