const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const suscribes = require('../../model/mongoose/suscribes.model.js');


class SuscribeDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, suscribes);
  }

  BuscarSuscribe = async (obj) =>{
    try {
        let datos;
        datos = await this.modelo.find({email:obj.email});
        return datos;
    } catch (error) {
        return [];
    }finally{
    }
}

}




module.exports = SuscribeDaoMongodb;
