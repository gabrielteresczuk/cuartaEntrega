const express = require("express");
const { Router } = express;
const router = Router();
const controladorCarrito = require("../controlador/controladorCarrito.js");
const passport = require('../midelwares/passport.js');                  // sesiones

/* ---------- /api/carrito ---------- */


router.post("/api/carrito", passport.authenticate('jwt',{ session: false }), controladorCarrito.postCarrito);
router.delete("/api/carrito/:id", passport.authenticate('jwt',{ session: false }), controladorCarrito.deleteCarrito);
router.get("/api/carrito/:id_usuario", passport.authenticate('jwt',{ session: false }), controladorCarrito.getCarritoPorUsuario);
router.post("/api/carrito/terminar", passport.authenticate('jwt',{ session: false }), controladorCarrito.postCarritoTerminar);
router.get("/api/carrito/terminar/:id_usuario",  controladorCarrito.getCarritoTerminar);
router.get("/api/carrito/:id/productos", controladorCarrito.getProductosPorCarrito);
router.post("/api/carrito/:id/productos", passport.authenticate('jwt',{ session: false }), controladorCarrito.postProductosEnCarrito);
router.delete("/api/carrito/:id/productos/:id_prod",passport.authenticate('jwt',{ session: false }),controladorCarrito.deleteProductoEnCarrito);

module.exports = router;
