const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {mariadbConfig} = require('../../../config.js');
const knexMariadb = require("knex")(mariadbConfig);
const esquema = require('../../model/knex/suscribe.model.js');

class SuscribeDaoMariadb extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexMariadb, "suscribes", esquema);

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

module.exports = SuscribeDaoMariadb;
