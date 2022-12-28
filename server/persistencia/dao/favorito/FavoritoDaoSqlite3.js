const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../../config.js');
const knexSqlite = require("knex")(sqlite3Config);
const esquema = require('../../model/knex/favoritos.model.js');

class FavoritoDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "favoritos", esquema);

  }

  guardarProducto = async (obj) => {
    try {

      let usuario = await this.knex(this.tabla).select("*").where({ id_usuario: obj.id_usuario });
      if (!usuario.length){
        let favorito = {
          id_usuario:obj.id_usuario,
          productos:JSON.stringify([obj.id_producto])
        }
        await this.knex(this.tabla).insert(favorito);
      }else{
        usuario[0].productos = JSON.parse(usuario[0].productos);
        let producto = usuario[0].productos.find(el=> el === obj.id_producto);
        if(producto){
          let nuevosDatos = usuario[0].productos.filter(producto => producto !== obj.id_producto);
          usuario[0].productos = JSON.stringify(nuevosDatos);
          await this.actualizar(usuario[0]);
        }else{
          usuario[0].productos.push(obj.id_producto);
          usuario[0].productos = JSON.stringify(usuario[0].productos);
          await this.actualizar(usuario[0]);
        }
      }

      let datosActualizados = await this.knex(this.tabla).select("*").where({ id_usuario: obj.id_usuario });
      datosActualizados[0].productos = JSON.parse(datosActualizados[0].productos);
      datosActualizados[0]['_id'] = datosActualizados[0].id;
      return datosActualizados[0];

    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };

  cargarProducto = async (id) => {
    try {
      let usuario = await this.knex(this.tabla).select("*").where({ id_usuario: id });
      if(!usuario.length){
        return [];
      }else{
        usuario[0].productos = JSON.parse(usuario[0].productos);
        return usuario[0];
      }

    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };


}

module.exports = FavoritoDaoSqlite3;
