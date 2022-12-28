const mongoose = require("mongoose");
const favoritosCollection = "favoritos";

const FavoritoSchema = new mongoose.Schema({
  id_usuario: { type: String, require: true },
  productos: { type: Array, require: true },
});

const favoritos = mongoose.model(favoritosCollection, FavoritoSchema);

module.exports = favoritos;