const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class FavoritoDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/favoritos.txt");
    console.log('Archivo Favorito: base de datos conectada');
  }

  guardarProducto = async (obj) => {
    try {

      let datos = await this.listarTodo();
      let usuario = datos.find(el => el.id_usuario === obj.id_usuario);

      if (!usuario){
        await this.guardar({
          id_usuario:obj.id_usuario,
          productos:[obj.id_producto]
        });
      }else{
        let producto = usuario.productos.find(el=> el === obj.id_producto);
        if(producto){
          let nuevosDatos = usuario.productos.filter(producto => producto !== obj.id_producto);
          usuario.productos = nuevosDatos;
          await this.actualizar(usuario);
        }else{
          usuario.productos.push(obj.id_producto);
          await this.actualizar(usuario);
        }
      }

      let datosActualizados = await this.listarTodo();
      let usuarioActualizado = datosActualizados.find(el => el.id_usuario === obj.id_usuario);

      return usuarioActualizado;
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };

  cargarProducto = async (id) => {
    try {
      let datos = await this.listarTodo();
      let usuario = datos.find(el => el.id_usuario === id);
      if(!usuario){
        return [];
      }else{
        return usuario;
      }
    } catch (error) {
      console.log("GuardarProducto - ocurrio un error: " + error);
    }
  };


}


module.exports = FavoritoDaoArchivo;
