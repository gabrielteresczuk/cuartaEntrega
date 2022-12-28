
let esquema = (table) => {
  table.increments("id");
  table.string("email");
  table.text("mensajes");
};


module.exports = esquema;