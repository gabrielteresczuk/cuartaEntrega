const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const {mongodbConfig} = require('../../../config.js');
const productos = require('../../model/mongoose/productos.model.js');


class ProductosDaoMongodb extends ContenedorMongodb {
  constructor() {
    super(mongodbConfig, productos);
  }


  listarTodoBusqueda = async (valor) =>{
    const regex =  new RegExp(valor,'i'); // correct way
    try {
        let datos;
        if(valor === '0'){
          datos = await this.modelo.find({});
        }else{
        datos = await this.modelo.find({nombre:regex});
        }
        let newDatos = datos.map(el=> {
            return {...el._doc,id:el._id.toString()}
        })
        return newDatos;
    } catch (error) {
        return [];
    }finally{
    }
}


listarTodoCategoria = async (valor) =>{
  try {
      let datos;
      if(valor === 'null'){
        datos = await this.modelo.find({});
      }else{
        datos = await this.modelo.find({categoria:valor});
      }
      let newDatos = datos.map(el=> {
          return {...el._doc,id:el._id.toString()}
      })
      return newDatos;
  } catch (error) {
      return [];
  }finally{
  }
}

}

module.exports = ProductosDaoMongodb;
