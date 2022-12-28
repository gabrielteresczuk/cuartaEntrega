const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class UsuariosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Usuarios: base de datos conectada');
  }

  buscar = async (obj)=>{
    try {
      let datos = await this.listarTodo();
      let usuario = datos.find(el => el.username === obj.username);
      return usuario;
    } catch (error) {
        console.log('Buscar -ocurrio un error:' +error);
    }
  }

}

module.exports = UsuariosDaoMemoria;
