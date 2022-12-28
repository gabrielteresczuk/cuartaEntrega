const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class SuscribeDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/suscribes.txt");
    console.log('Archivo Suscribe: base de datos conectada');
  }

  BuscarSuscribe = async (obj) =>{
    try {
      console.log(obj);
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


module.exports = SuscribeDaoArchivo;
