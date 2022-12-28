const ContenedorSqlite3Mariadb = require("../../contenedores/ContenedorSqlite3Mariadb.js");
const {sqlite3Config} = require('../../../config.js');
const knexSqlite = require("knex")(sqlite3Config);
const esquema = require('../../model/knex/chats.model.js');

class ChatsDaoSqlite3 extends ContenedorSqlite3Mariadb {
  constructor() {
    super(knexSqlite, "mensajes", esquema);

  }


  listarTodoPorEmail = async (email)=>{
    try {
        let datos = await this.knex(this.tabla).select("*").where({ email: email });
        datos[0].mensajes = JSON.parse(datos[0].mensajes);
        return datos[0];
    } catch (error) {
        console.log(' listarTodoPorEmail -ocurrio un error:' +error);
    }
  }

  guardarMensajePorEmail = async (chat,email)=>{
    try {

      let emailDB = await this.knex(this.tabla).select("*").where({ email: email });
      if(!emailDB.length){
        let mensaje = {
          email:email,
          mensajes:JSON.stringify([chat])
        }
        let nuevoMensaje = await this.guardar(mensaje);
        return nuevoMensaje;
      }else{
        emailDB[0].mensajes = JSON.parse(emailDB[0].mensajes);
        emailDB[0].mensajes.push(chat);
        emailDB[0].mensajes = JSON.stringify(emailDB[0].mensajes);
        let nuevoMensaje = await this.actualizar(emailDB[0])
        return nuevoMensaje;
      }
    } catch (error) {
      console.log(' guardarMensajePorEmail -ocurrio un error:' +error);
    }
  }


}

module.exports = ChatsDaoSqlite3;
