const path = require("path");
const negocioSuscribe = require("../negocios/negocioSuscribe.js");
const negocioContacto = require("../negocios/negocioContacto.js");
const negocioFavorito = require("../negocios/negocioFovorito.js");
const logger = require("../utils/logger/logger.js"); // -> logger
const { config } = require("../config.js");

module.exports = {
  async getPug(req, res, next) {
    try {
      
      logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
      res.render("pug/config.pug", { config: config });
    } catch (error) {

      res.render("ejs/error.ejs", { error });
    }
  },
  async getHbs(req, res, next) {
    try {
      logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
      res.render("hbs/config.handlebars", { config: config });
    } catch (error) {
      res.render("ejs/error.ejs", { error });
    }
  },
  async getFavorito(req, res, next) {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    let { id_usuario } = req.params;
    let datos = await negocioFavorito.cargarProducto(id_usuario);

    res.json(datos);
  },
  async postFavorito(req, res, next) {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    let datos = await negocioFavorito.guardarProducto(req.body);
    res.json(datos);
  },
  async deleteFavorito(req, res, next) {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const { id } = req.params;
    let datos = await negocioFavorito.borrarPorId(id);
    res.json(datos);
  },
  async postContacto(req, res, next) {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    let datos = await negocioContacto.guardar(req.body);
    res.json(datos);
  },
  async deleteContacto(req, res, next) {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const { id } = req.params;
    let datos = await negocioContacto.borrarPorId(id);
    res.json(datos);
  },
  async postSuscribe(req, res, next) {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    let datos = await negocioSuscribe.guardar(req.body);
    res.json(datos);
  },
  async deleteSuscribe(req, res, next) {
    logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
    const { id } = req.params;
    let datos = await negocioSuscribe.borrarPorId(id);
    res.json(datos);
  },
  // cualquier ruta que no exista
  async rutaNoImplementada(req, res, next) {
    res.json({
      error: -2,
      descripcion: `ruta '${req.path}' método '${req.method}' no implementada`,
    });
  },
  // sin este PATH, no podes actualizar las paginas con REACT ROUTER
  async rutaABuild(req, res, next) {
    res.sendFile(path.join(__dirname + "/../build/index.html"));
  },
};
