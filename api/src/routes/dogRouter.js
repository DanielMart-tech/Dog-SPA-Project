const express = require("express");
const DogService = require("../services/dogService");

const router = express.Router();

const dogService = new DogService();

router.post("/", (req, res) => dogService.postDog(req, res));

module.exports = router;
