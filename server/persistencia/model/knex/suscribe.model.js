
let esquema = (table) => {
  table.increments("id");
  table.string("email");
};

module.exports = esquema;