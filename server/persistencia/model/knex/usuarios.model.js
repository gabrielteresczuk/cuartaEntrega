
let esquema = (table) => {
  table.increments("id");
  table.string("username");
  table.string("password");
  table.string("nombre");
  table.string("direccion");
  table.integer("edad");
  table.string("telefono");
  table.string("avatar");
};
module.exports = esquema;