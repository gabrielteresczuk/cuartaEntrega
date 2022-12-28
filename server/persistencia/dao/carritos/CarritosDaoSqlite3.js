const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../../config.js');
const knexSqlite = require("knex")(sqlite3Config);
const esquema = require('../../model/knex/carritos.model.js');

class CarritosDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "carritos", esquema);
    console.log('Sqlite3: base de datos conectada');
  }

  guardarProducto = async (id, obj) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        carrito.productos.push(obj);
        carrito.productos = JSON.stringify(carrito.productos);
        await this.actualizar(carrito);
        return carrito;
      } else {
        return [];
      }
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };

  listarTodo = async () => {
    try {
      let datos = await this.knex(this.tabla).select("*");
      let newDatos = datos.map((el) => {
        if (el.productos) {
          el.productos = JSON.parse(el.productos);
        }
        return el;
      });
      return newDatos;
    } catch (error) {
      return [];
    } finally {
      // this.knex.destroy();
    }
  };

  listarPorId = async (id) => {
    try {
      let datos = await this.knex(this.tabla).select("*").where({ id: id });
      datos[0].productos = datos[0].productos
        ? JSON.parse(datos[0].productos)
        : [];
      return datos[0];
    } catch (error) {
      return "ListarPorId - No se pudo consultar:" + error;
    } finally {
      // this.knex.destroy();
    }
  };

  listarProductosPorId = async (id) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        if (carrito.productos) {
          return carrito.productos;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log("ListarProductosPorId - ocurrio un error: " + error);
    }
  };

  borrarProductoPorId = async (id, id_prod) => {
    try {
      let carrito = await this.listarPorId(id);

      let productos = carrito.productos.filter(
        (producto, index) => index !== parseInt(id_prod)
      );
      productos = JSON.stringify(productos);

      await this.actualizar({ ...carrito, productos: productos });

      return { delete: id_prod };
    } catch (error) {
      console.log("BorrarProductoPorId Ocurrio un error : " + error);
    }
  };

  buscarCarritoPorUsuario = async (id_usuario) =>{
    try {

      //let carrito = await this.modelo.findOne({$and: [{id_usuario:id_usuario},{cerrado:false}]},{_id:1});
      let carrito = await this.knex(this.tabla).select("*").where({ id_usuario: id_usuario }).andWhere({cerrado:false});
      if(carrito.length){
        return {id_carrito: carrito[0].id};
      }else{
        return null;
      }
      
    } catch (error) {
      console.log("buscarCarritoPorUsuario : " + error);
    }
  }

  buscarCarritoTerminadoPorUsuario = async (id_usuario) =>{
    try {
      
      let carrito = await this.knex(this.tabla).select("*").where({ id_usuario: id_usuario }).andWhere({cerrado:true});
      

      if(carrito[0]?.productos){
        carrito.map(el => el.productos = JSON.parse(el.productos));
      }
      if(carrito){
        return {carrito:carrito};
      }else{
        return null;
      }
      
    } catch (error) {
      console.log("buscarCarritoTerminadoPorUsuario : " + error);
    }
  }

  terminarCarrito = async (id_carrito) => {
    try {

        await this.knex(this.tabla).where({id:id_carrito}).update({cerrado:true});
        return {msg:'ok'};

    } catch (error) {
      console.log("terminarCarrito - ocurrio un error: " + error);
    }
  };

  enviarCorreo = async (id_carrito) =>{
    try {
      let productos = await this.ListarProductosPorId(id_carrito);

      return productos;

    } catch (error) {
      console.log("Enviar Correo - ocurrio un error: " + error);
    }
  }


}

module.exports = CarritosDaoSqlite3;
