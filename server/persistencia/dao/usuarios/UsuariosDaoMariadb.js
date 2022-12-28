const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {mariadbConfig} = require('../../../config.js');
const knexMariadb = require("knex")(mariadbConfig);
const esquema = require('../../model/knex/usuarios.model.js');

class UsuariosDaoMariadb extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexMariadb, "usuarios", esquema);

  }

  buscar = async (obj)=>{
    try {
      let usuario = await this.knex(this.tabla).select('*').where({username:obj.username});
      if(usuario[0]?.id){
        usuario[0]['_id'] = usuario[0].id;
      }
      return usuario[0];
    } catch (error) {
        console.log('Buscar -ocurrio un error:' +error);
    }
  }

}

module.exports = UsuariosDaoMariadb;
