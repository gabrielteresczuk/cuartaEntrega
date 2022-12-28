const mongoose = require("mongoose");
const chatsCollection = "mensajes";

const ChatsSchema = new mongoose.Schema({
  email: { type: String, require: true },
  mensajes: { type: Array, require: true },
});

const chats = mongoose.model(chatsCollection, ChatsSchema);

module.exports = chats;