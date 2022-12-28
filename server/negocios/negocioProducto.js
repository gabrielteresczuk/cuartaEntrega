const {Producto} = require("../persistencia/dao/factory.js");
const Productos = new Producto();

module.exports = {
    async listarTodoBusqueda(valor){
        return await Productos.listarTodoBusqueda(valor);
    },
    async listarTodoCategoria(valor){
        return await Productos.listarTodoCategoria(valor);
    },
    async listarPorId(id){
        return await Productos.listarPorId(id);
    },
    async listarTodo(){
        return await Productos.listarTodo();
    },
    async guardar(obj){
        let timestamp = Date.now();
        let id = await Productos.guardar({ timestamp, ...obj });
        return {id:id}
    },
    async actualizar(obj){
        let timestamp = Date.now();

        let id = await Productos.actualizar({ timestamp, ...obj });
        return {id:id}
    },
    async borrarPorId(id){
        let data = await Productos.borrarPorId(id);
        return { delete: data }
    }

}