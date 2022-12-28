const {favoritoFactory} = require("../persistencia/dao/factory.js");
const Favorito = new favoritoFactory();

module.exports = {
    async listarPorId(id){
        return await Favorito.listarPorId(id);
    },
    async listarTodo(){
        return await Favorito.listarTodo();
    },
    async guardar(obj){
        let id = await Favorito.guardar( obj );
        return {resp:id}
    },
    async actualizar(obj){
        let timestamp = Date.now();
        let id = await Favorito.actualizar({ timestamp, ...obj });
        return {id:id}
    },
    async borrarPorId(id){
        let data = await Favorito.borrarPorId(id);
        return { delete: data }
    },
    async guardarProducto(obj){
        let datos = await Favorito.guardarProducto(obj);
        return datos
    },
    async cargarProducto(id){
        let datos = await Favorito.cargarProducto(id);
        return datos
    }
}