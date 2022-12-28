const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class CarritosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Carritos: base de datos conectada');
  }

  guardarProducto = async (id, obj) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        carrito.productos.push(obj);
        await this.actualizar(carrito);
        return carrito;
      } else {
        return [];
      }
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };

  listarProductosPorId = async (id) => {
    try {
      let carrito = await this.listarPorId(id);
      if (carrito) {
        return carrito.productos;
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

      await this.actualizar({ ...carrito, productos: productos });

      return { delete: id_prod };
    } catch (error) {
      console.log("BorrarProductoPorId Ocurrio un error : " + error);
    }
  };

  buscarCarritoPorUsuario = async (id_usuario) =>{
    try {

      let carrito = await this.listarTodo();

      let carritoFiltrado = carrito.filter(el => (el.id_usuario === id_usuario) && (el.cerrado === false));
      
      if(carritoFiltrado[0]){
        return {id_carrito: carritoFiltrado[0].id};
      }else{
        return null;
      }
      //return null;
      
    } catch (error) {
      console.log("buscarCarritoPorUsuario : " + error);
    }
  }


  buscarCarritoTerminadoPorUsuario = async (id_usuario) =>{
    try {
      let carrito = await this.listarTodo();

      let carritoFiltrado = carrito.filter(el => (el.id_usuario === id_usuario) && (el.cerrado === true));
      console.log(carritoFiltrado);
      if(carritoFiltrado){
        return {carrito:carritoFiltrado};
      }else{
        return null;
      }
      
    } catch (error) {
      console.log("buscarCarritoTerminadoPorUsuario : " + error);
    }
  }

  terminarCarrito = async (id_carrito) => {
    try {
        let carrito = await this.listarPorId(id_carrito);
        carrito.cerrado = true;
        await this.actualizar(carrito);
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

module.exports = CarritosDaoMemoria;
