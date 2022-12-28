const mongoose = require("mongoose");
const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
  id_usuario: {type: String, require: true},
  timestamp: { type: String, require: true },
  productos: { type: Array, require: true },
  cerrado:{type: Boolean, require: true},
});
const carritos = mongoose.model(carritosCollection, CarritosSchema);

module.exports = carritos;