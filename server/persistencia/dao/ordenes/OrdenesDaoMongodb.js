const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const ordenes = require('../../model/mongoose/ordenes.model.js');

class OrdenesDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, ordenes);
  }

  guardarOrden = async (productos, obj) => {
    try {
      let numeroDeOrden = await this.modelo.countDocuments({}) + 1;

      let orden = {
        id_usuario:obj.id_usuario,
        productos:productos,
        numero:numeroDeOrden,
        fechayhora:new Date().toLocaleString(),
        estado:'generada',
        email:obj.username
      }
      let id = await this.guardar(orden);
      return id;
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };


}

module.exports = OrdenesDaoMongodb;
