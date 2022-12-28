const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class ChatsDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/mensajes.txt");
    console.log('Archivo Mensajes.txt: conectada');
  }

  listarTodoPorEmail = async (email)=>{
    try {
        let datos = await this.listarTodo();
        let usuario = datos.find(el => el.email === email);
        return usuario;
    } catch (error) {
        console.log(' listarTodoPorEmail -ocurrio un error:' +error);
    }
  }

  guardarMensajePorEmail = async (chat,email)=>{
    try {
      let datos = await this.listarTodo();
      let emailDB = datos.find(el => el.email === email);
      if(!emailDB){
        let nuevoMensaje = await this.guardar({email,mensajes:[chat]});
        return nuevoMensaje;
      }else{
        emailDB.mensajes.push(chat);
        let nuevoMensaje = await this.actualizar(emailDB);;
        return nuevoMensaje;
      }
    } catch (error) {
      console.log(' guardarMensajePorEmail -ocurrio un error:' +error);
    }
  }


}

module.exports = ChatsDaoArchivo;
