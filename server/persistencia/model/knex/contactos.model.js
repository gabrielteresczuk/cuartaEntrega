
let esquema = (table) => {
  table.increments("id");
  table.string("apellido");
  table.string("nombre");
  table.string("email");
  table.string("telefono");
  table.string("texto");
};

module.exports = esquema;