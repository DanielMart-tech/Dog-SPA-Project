const express = require("express");
const DogService = require("../services/dogService");

const router = express.Router();
const dogService = new DogService();

router.get("/", (req, res) => dogService.getTemperaments(res));

module.exports = router;
