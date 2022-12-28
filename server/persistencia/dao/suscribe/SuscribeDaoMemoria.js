const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class SuscribeDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Suscribe: base de datos conectada');
  }

  BuscarSuscribe = async (obj) =>{
    try {
        let datos;
        datos = await this.listarTodo();
        let email = datos.find(el => el.email === obj.email);
        if(email){
          return [email];
        }else{
          return [];
        }
    } catch (error) {
        return [];
    }finally{
    }
  }


}

module.exports = SuscribeDaoMemoria;
