const express = require("express");
const router = express.Router();
const Hero = require("../model/Hero");
const herosController = require("../controllers/hero-controller");

router.get("/", herosController.getAllHeros);
router.post("/", herosController.addHero);
router.get("/:id", herosController.getById);
router.put("/:id", herosController.updateHero);
router.delete("/:id", herosController.deleteHero);



module.exports = router;
