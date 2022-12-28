const logger = require("../utils/logger/logger.js"); // -> logger

const negocioCarritos = require('../negocios/negocioCarrito.js');
const negocioProductos = require('../negocios/negocioProducto.js');

/* ----------- MENSAJERIA ----------- */
const { nuevoPedido } = require("../utils/nodemailer.js"); //-> MAIL
const { enviarSMS } = require("../utils/twilio.js"); //-> SMS
const { enviarWSP } = require("../utils/twilio.js"); //-> WSP

module.exports = {
    async postCarrito(req,res,next){
      logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id_usuario } = req.body;
        let datos = await negocioCarritos.guardar({id_usuario});
        res.json(datos);
    },

    async deleteCarrito(req,res,next){
      logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id } = req.params;
        let datos = await negocioCarritos.borrarPorId(id);
        res.json(datos);
    },

    async getCarritoPorUsuario(req,res,next){
      logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id_usuario } = req.params;
        let datos = await negocioCarritos.buscarCarritoPorUsuario(id_usuario);

        res.json(datos);
    },
    async getCarritoTerminar(req,res,next){
      logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id_usuario } = req.params;
        let datos = await negocioCarritos.buscarCarritoTerminadoPorUsuario(id_usuario);

        res.json(datos);
    },

    async postCarritoTerminar(req,res,next){
      logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { username, nombre, id_carrito } = req.body;
        let user = { username, nombre };
      
        try {
          let productos = await negocioCarritos.listarProductosPorId(id_carrito);
          //await nuevoPedido(productos, user);           //-> enviar mail, FREE
          //await enviarSMS(user);                        //-> enviar SMS, $$$$ COSTO
          //await enviarWSP();                            //-> enviar ESP, $$$$ COSTO
          let data = await negocioCarritos.terminarCarrito(id_carrito);
          res.json(data);
        } catch (error) {
          console.log(error);
        }
    },

    async getProductosPorCarrito(req,res,next){
        logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id } = req.params;
        let datos = await negocioCarritos.listarProductosPorId(id);
        res.json(datos);
    },

    async postProductosEnCarrito(req,res,next){
        logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id } = req.params;
        const { id_prod } = req.body;
        const {cantidad} = req.body;
      
        let producto = await negocioProductos.listarPorId(id_prod);
        let datos = await negocioCarritos.guardarProducto(id, producto, cantidad);
        res.json(datos);
    },

    async deleteProductoEnCarrito(req,res,next){
        logger.log("info", `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id, id_prod } = req.params;
    
        let datos = negocioCarritos.borrarProductoPorId(id, id_prod);
        res.json(datos);
    }
}