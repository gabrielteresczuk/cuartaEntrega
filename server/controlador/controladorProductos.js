//const negociosProductos = require('../negocios/negocioProductos.js');
const logger = require('../utils/logger/logger.js'); // -> logger

const negocioProductos = require('../negocios/negocioProducto.js');

module.exports = {
    async getProductosPorBusqueda(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
      const { valor } = req.params;
      let datos = await negocioProductos.listarTodoBusqueda(valor);
      res.json(datos);
    },
    async getProductosPorCategoria(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
      const { valor } = req.params;
      let datos = await negocioProductos.listarTodoCategoria(valor);
      res.json(datos);
    },
    // 1 o todos
    async getProductos(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const { id } = req.params;
        let datos = null;
        if (id) {
          datos = await negocioProductos.listarPorId(id);
        } else {
          datos = await negocioProductos.listarTodo();
        }
        res.json(datos);
    },
    // guarda 1 nuevo
    async postProducto(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const {administrador} = req.body;
        const producto = {...req.body};
        delete producto.id;
        delete producto.administrador;

        if (administrador) {

          let datos = await negocioProductos.guardar(producto);
          res.json(datos);
        } else {
          res.json({error: -1, descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`});
        }
    },
    // actualiza 1
    async putProducto(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const {administrador} = req.body;
        const { id } = req.params;
        const producto = {...req.body};
        delete producto.id;
        delete producto.administrador;
        
        if (administrador) {
          let datos = await negocioProductos.actualizar({ id: id, ...producto })
          res.json(datos);
        } else {
          res.json({error: -1,descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`});
        }
    },
    // elimina 1
    async deleteProducto(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const {administrador} = req.body;
        const { id } = req.params;

        if (administrador) {
          let datos = await negocioProductos.borrarPorId(id);
          res.json(datos);
        } else {
          res.json({error: -1,descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`});
        }
    }

}