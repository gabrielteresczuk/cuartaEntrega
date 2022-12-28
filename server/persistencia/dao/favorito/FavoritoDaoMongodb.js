const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const favoritos = require('../../model/mongoose/favoritos.model.js');

class FavoritoDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, favoritos);
  }


  guardarProducto = async (obj) => {
    try {
      
      let usuario = await this.modelo.find({id_usuario : obj.id_usuario});
      let include;
      if(usuario.length){
        include = usuario[0].productos.includes(obj.id_producto);
      }
      
      
      if (include){
        await this.modelo.updateOne(
          { id_usuario: obj.id_usuario },
          { $pull: { productos: obj.id_producto } },
        );
      }else{
        await this.modelo.updateOne(
          { id_usuario: obj.id_usuario },
          { $push: { productos: obj.id_producto } },
          {upsert: true}
        );
      }

      let datos = await this.modelo.find({id_usuario : obj.id_usuario});


      return datos[0];
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };

  cargarProducto = async (id) => {
    try {

      let datos = await this.modelo.find({id_usuario : id});
      if (datos.length){
        return datos[0];
      }else{
        return [];
      }
      
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };


  
}

module.exports = FavoritoDaoMongodb;
