const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class OrdenesDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Ordenes: base de datos conectada');
  }

  guardarOrden = async (productos, obj) => {
    try {
      let datos = await this.listarTodo();
      let numeroDeOrden = datos.length + 1;
      let orden = {
        id_usuario:obj.id_usuario,
        productos:productos,
        numero:numeroDeOrden,
        fechayhora:new Date().toLocaleString(),
        estado:'generada',
        email:obj.username
      }
      let id = await this.guardar(orden);
      return id;
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };

}

module.exports = OrdenesDaoMemoria;
