const logger = require('../utils/logger/logger.js'); // -> logger

const negocioOrdenes = require('../negocios/negocioOrdenes.js');
const negocioCarritos = require('../negocios/negocioCarrito.js');

module.exports = {
    async getOrdenPorId(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
      const { id } = req.params;
      let datos = await negocioOrdenes.listarPorId(id);
      res.json(datos);
    },
    async getOrdenes(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        datos = await negocioOrdenes.listarTodo();
        res.json(datos);
    },
    // guarda 1 nuevo
    async postOrden(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
          const { username, nombre, id_carrito } = req.body;
          let user = { username, nombre };
          try {
            let productos = await negocioCarritos.listarProductosPorId(id_carrito);
            //await nuevoPedido(productos, user);           //-> enviar mail, FREE
            //await enviarSMS(user);                        //-> enviar SMS, $$$$ COSTO
            //await enviarWSP();                            //-> enviar ESP, $$$$ COSTO
            let data = await negocioOrdenes.guardarOrden(productos,req.body);
            await negocioCarritos.terminarCarrito(id_carrito);
            res.json(data);
          } catch (error) {
            console.log(error);
          }
    },
    // actualiza 1
    async putOrden(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id } = req.params;
          let datos = await negocioOrdenes.actualizar({ id: id, ...req.body })
          res.json(datos);
    },
    // elimina 1
    async deleteOrden(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id } = req.params;
        let datos = await negocioOrdenes.borrarPorId(id);
        res.json(datos);
    }

}