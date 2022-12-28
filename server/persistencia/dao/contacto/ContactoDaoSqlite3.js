const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../../config.js');
const knexSqlite = require("knex")(sqlite3Config);
const esquema = require('../../model/knex/contactos.model.js');


class ContactoDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "contactos", esquema);

  }
}

module.exports = ContactoDaoSqlite3;
