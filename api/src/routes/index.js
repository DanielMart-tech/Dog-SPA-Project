const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogsRouter");
const temperamentRouter = require("./temperamentRouter");
const dogRouter = require("./dogRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsRouter);
router.use("/temperament", temperamentRouter);
router.use("/dog", dogRouter);
router.use(function unknownEndpoint(req, res) {
  res.status(404).send({ error: "unknown endpoint" });
});

module.exports = router;
