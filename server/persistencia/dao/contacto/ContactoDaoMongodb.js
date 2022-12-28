const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const contactos = require('../../model/mongoose/contactos.model.js');


class ContactoDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, contactos);
  }
  
}

module.exports = ContactoDaoMongodb;
