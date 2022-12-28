const express = require("express");
const { Router } = express;
const router = Router();
const controladorProductos = require('../controlador/controladorProductos.js');

/* -------------- rutas ------------- */

router.get("/api/productos/categoria/:valor?", controladorProductos.getProductosPorCategoria);
router.get("/api/productos/busqueda/:valor?", controladorProductos.getProductosPorBusqueda);
router.get("/api/productos/:id?", controladorProductos.getProductos);
router.post("/api/productos", controladorProductos.postProducto);
router.put("/api/productos/:id", controladorProductos.putProducto);
router.delete("/api/productos/:id", controladorProductos.deleteProducto);

module.exports = router;