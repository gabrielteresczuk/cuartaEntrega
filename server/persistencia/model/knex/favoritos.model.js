
let esquema = (table) => {
  table.increments("id");
  table.string("id_usuario");
  table.text("productos");
};

module.exports = esquema;