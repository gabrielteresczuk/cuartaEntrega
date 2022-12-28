const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {mariadbConfig} = require('../../../config.js');
const knexMariadb = require("knex")(mariadbConfig);
const esquema = require('../../model/knex/ordenes.model.js');


class OrdenesDaoMariadb extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexMariadb, "ordenes", esquema);

  }

  guardarOrden = async (productos, obj) => {
    try {
      let datos = await this.listarTodo();
      let numeroDeOrden = datos.length + 1; 
      let newProductos = JSON.stringify(productos);
      let orden = {
        id_usuario:obj.id_usuario,
        productos:newProductos,
        numero:numeroDeOrden,
        fechayhora:new Date().toLocaleString(),
        estado:'generada',
        email:obj.username
      }

      let id = await await this.knex(this.tabla).insert(orden);
      return id;
    } catch (error) {
      console.log("guardarOrden - ocurrio un error: " + error);
    }
  };


}

module.exports = OrdenesDaoMariadb;
