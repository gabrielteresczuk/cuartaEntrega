const express = require("express");
const { Router } = express;
const router = Router();
const controladorOrdenes = require('../controlador/controladorOrdenes.js');

/* -------------- rutas ------------- */

router.get("/api/ordenes/:id?", controladorOrdenes.getOrdenPorId);
router.get("/api/ordenes", controladorOrdenes.getOrdenes);
router.post("/api/ordenes", controladorOrdenes.postOrden);
router.put("/api/ordenes/:id", controladorOrdenes.putOrden);
router.delete("/api/ordenes/:id", controladorOrdenes.deleteOrden);

module.exports = router;