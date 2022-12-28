const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');

const usuarios = require('../../model/mongoose/usuarios.model.js');

class UsuariosDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, usuarios);
  }

  buscar = async (obj)=>{
    try {
        let datos = await this.modelo.findOne({username:obj.username});
        return datos;
    } catch (error) {
        console.log('Buscar -ocurrio un error:' +error);
    }
  }
  
}

module.exports = UsuariosDaoMongodb;
