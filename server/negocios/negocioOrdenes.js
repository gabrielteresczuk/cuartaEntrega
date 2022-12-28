const {ordenesFactory} = require("../persistencia/dao/factory.js");
const Orden = new ordenesFactory();

module.exports = {
    async listarPorId(id){
        return await Orden.listarPorId(id);
    },
    async listarTodo(){
        return await Orden.listarTodo();
    },
    async guardarOrden(productos,obj){
        let id = await Orden.guardarOrden(productos, obj );
        return {resp:id}
    },
    async actualizar(obj){
        let timestamp = Date.now();
        let id = await Orden.actualizar({ timestamp, ...obj });
        return {id:id}
    },
    async borrarPorId(id){
        let data = await Orden.borrarPorId(id);
        return { delete: data }
    }
}