const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../../config.js');
const knexSqlite = require("knex")(sqlite3Config);
const esquema = require('../../model/knex/usuarios.model.js');


class UsuariosDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "usuarios", esquema);

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

module.exports = UsuariosDaoSqlite3;
