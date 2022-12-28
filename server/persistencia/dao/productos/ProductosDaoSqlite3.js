const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../../config.js');
const knexSqlite = require("knex")(sqlite3Config);
const esquema = require('../../model/knex/productos.model.js');

class ProductosDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "productos", esquema);

  }

  listarTodo = async () =>{
    try {
        let datos = await this.knex(this.tabla).select('*');
        
        if(datos[0]?.id){
            datos.map(el => el['_id'] = el.id);
        }
        return datos;
    } catch (error) {
        return [];
    }
  }

  listarTodoBusqueda = async (valor) =>{
    try {
        let datos;
        if(valor === '0'){
          datos = await this.listarTodo();
        }else{
          datos = await this.knex(this.tabla).select('*').whereILike('nombre', `%${valor}%`);
        }
        return datos;
    } catch (error) {
        return [];
    }finally{
    }
}


listarTodoCategoria = async (valor) =>{
  try {
      let datos;
      if(valor === 'null'){
        datos = await this.listarTodo();
      }else{
        datos = await this.knex(this.tabla).select('*').where({categoria:valor});
      }
      return datos;
  } catch (error) {
      return [];
  }finally{
  }
}


}

module.exports = ProductosDaoSqlite3;
