const mongoose = require("mongoose");
const suscribeCollection = "suscribes";

const SuscribeSchema = new mongoose.Schema({
  email: { type: String, require: true }
});

const suscribes = mongoose.model(suscribeCollection, SuscribeSchema);

module.exports = suscribes;