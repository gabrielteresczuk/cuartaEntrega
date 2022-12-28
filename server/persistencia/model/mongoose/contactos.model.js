const mongoose = require("mongoose");
const contactosCollection = "contactos";

const ContactoSchema = new mongoose.Schema({
  apellido: { type: String, require: true },
  nombre: { type: String, require: true },
  email: { type: String, require: true },
  telefono: { type: String, require: true },
  texto: { type: String, require: true }
});


const contactos = mongoose.model(contactosCollection, ContactoSchema);

module.exports = contactos;