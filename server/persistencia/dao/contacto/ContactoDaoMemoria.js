const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class ContactoDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Contactos: base de datos conectada');
  }

}

module.exports = ContactoDaoMemoria;
