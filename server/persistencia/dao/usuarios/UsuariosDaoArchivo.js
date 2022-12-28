const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class UsuariosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/usuarios.txt");
    console.log('Archivo Usuarios: base de datos conectada');
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


module.exports = UsuariosDaoArchivo;
