
let esquema = (table) => {
  table.increments("id");
  table.string("id_usuario");
  table.string("timestamp");
  table.text("productos");
  table.boolean('cerrado');
};


module.exports = esquema;