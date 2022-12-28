const {contactoFactory} = require("../persistencia/dao/factory.js");
const Contacto = new contactoFactory();

module.exports = {
    async listarPorId(id){
        return await Contacto.listarPorId(id);
    },
    async listarTodo(){
        return await Contacto.listarTodo();
    },
    async guardar(obj){
        let id = await Contacto.guardar( obj );
        return {resp:id}
    },
    async actualizar(obj){
        let timestamp = Date.now();
        let id = await Contacto.actualizar({ timestamp, ...obj });
        return {id:id}
    },
    async borrarPorId(id){
        let data = await Contacto.borrarPorId(id);
        return { delete: data }
    }
}