const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../../config.js');
const knexSqlite = require("knex")(sqlite3Config);
const esquema = require('../../model/knex/suscribe.model.js');

class SuscribeDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "suscribes", esquema);

  }

  BuscarSuscribe = async (obj) =>{
    try {
        let datos = await this.knex(this.tabla).select('*').where({email:obj.email});
        return datos;
    } catch (error) {
        return [];
    }finally{
    }
}


}

module.exports = SuscribeDaoSqlite3;
