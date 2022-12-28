const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {mariadbConfig} = require('../../../config.js');
const knexMariadb = require("knex")(mariadbConfig);
const esquema = require('../../model/knex/contactos.model.js');


class ContactoDaoMariadb extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexMariadb, "contactos", esquema);

  }
}

module.exports = ContactoDaoMariadb;
