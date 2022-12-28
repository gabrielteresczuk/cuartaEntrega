
let esquema = (table) => {
  table.increments("id");
  table.string("id_usuario");
  table.text("productos");
  table.integer("numero");
  table.string("fechayhora");
  table.string("estado");
  table.string("email");
};
module.exports = esquema;