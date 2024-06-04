var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/graficos", function (req, res) {
    medidaController.buscarPontuacao(req, res);
});


module.exports = router;