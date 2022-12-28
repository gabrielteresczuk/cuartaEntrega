const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const chats = require('../../model/mongoose/chats.model.js');


class ChatsDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig,chats);
  }

  listarTodoPorEmail = async (email)=>{
    try {
        let datos = await this.modelo.find({email:email});

        return datos[0];
    } catch (error) {
        console.log(' listarTodoPorEmail -ocurrio un error:' +error);
    }
  }

  guardarMensajePorEmail = async (chat,email)=>{
    try {
      let emailDB = await this.modelo.find({email:email});
      //console.log(emailDB);
      if(!emailDB.length){
        let nuevoMensaje = await this.guardar({email,mensajes:chat});
        return nuevoMensaje;
      }else{
        let nuevoMensaje = await this.modelo.updateOne({email:email},{$push:{mensajes:chat}});
        return nuevoMensaje;
      }
    } catch (error) {
      console.log(' guardarMensajePorEmail -ocurrio un error:' +error);
    }
  }

}


module.exports = ChatsDaoMongodb;
