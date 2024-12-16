const express = require("express");
const { addTrain,searchTrain } = require("../controller/train")

const TrainRouter = express.Router();

TrainRouter.post("/addTrain", addTrain)
TrainRouter.post("/searchTrain", searchTrain)


module.exports = TrainRouter;