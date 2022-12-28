const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class ContactoDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/contactos.txt");
    console.log('Archivo Contacto: base de datos conectada');
  }



}


module.exports = ContactoDaoArchivo;
