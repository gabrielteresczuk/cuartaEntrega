
let esquema = (table) => {
  table.increments("id");
  table.string("timestamp");
  table.string("nombre");
  table.string("descripcion");
  table.string("codigo");
  table.string("foto");
  table.integer("precio");
  table.integer("stock");
  table.string("categoria");
  table.string("subcategoria");
  table.integer("ranking");
};

module.exports = esquema;