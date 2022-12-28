const mongoose = require("mongoose");
const ordenesCollection = "ordenes";

const OrdenesSchema = new mongoose.Schema({
  id_usuario: {type: String, require: true},
  productos: { type: Array, require: true },
  numero: { type: Number, require: true },
  fechayhora: { type: String, require: true },
  estado: {type: String, require: true},
  email: {type: String, require: true},
});

const ordenes = mongoose.model(ordenesCollection, OrdenesSchema);

module.exports = ordenes;