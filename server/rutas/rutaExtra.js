const express = require("express");
const controladorChat = require("../controlador/controladorChat.js");
const { Router } = express;
const router = Router();
const controladorExtra = require('../controlador/controladorExtra.js');
const passport = require('../midelwares/passport.js');                  // sesiones


router.get('/config',controladorExtra.getPug);
router.get('/hbs',controladorExtra.getHbs);

router.post("/suscribe",controladorExtra.postSuscribe);
router.delete("/suscribe/:id",controladorExtra.deleteSuscribe);

router.post("/contacto",controladorExtra.postContacto);
router.delete("/contacto/:id",controladorExtra.deleteContacto);

router.post("/favorito",controladorExtra.postFavorito);
router.get("/favorito/:id_usuario",controladorExtra.getFavorito);
router.delete("/favorito/:id",controladorExtra.deleteFavorito);

router.get("/chat", controladorChat.cargarVista);
router.get("/chat/:email", controladorChat.cargarVistaPrivada);
router.get("/chats/sistema", controladorChat.cargarVistaSistema);
router.get("/chats/sistema/:email", controladorChat.cargarVistaSistemaEmail);
router.get("/api/*", controladorExtra.rutaNoImplementada);
router.get("*", controladorExtra.rutaABuild);

module.exports = router;