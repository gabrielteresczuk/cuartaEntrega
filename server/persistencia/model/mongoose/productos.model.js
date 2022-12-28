const mongoose = require("mongoose");
const productosCollection = "productos";

const ProductosSchema = new mongoose.Schema({
  timestamp: { type: String, require: true },
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  codigo: { type: String, require: true },
  foto: { type: String, require: true },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true },
  categoria: { type: String, require: true },
  subcategoria: { type: String, require: true },
  ranking: { type: Number, require: true },
});

const productos = mongoose.model(productosCollection, ProductosSchema);

module.exports = productos;