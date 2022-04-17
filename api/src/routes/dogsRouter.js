const express = require("express");
const DogService = require("../services/dogService");

const router = express.Router();

const dogService = new DogService();

router.get("/", (req, res) => {
  const { name } = req.query;
  if (name) dogService.getDogName(req, res);
  else dogService.getDogs(res);
});

router.get("/:identifier", (req, res) => dogService.getDogId(req, res));

module.exports = router;
