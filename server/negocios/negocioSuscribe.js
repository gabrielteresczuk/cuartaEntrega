const {suscribeFactory} = require("../persistencia/dao/factory.js");
const Suscribe = new suscribeFactory();

module.exports = {
    async listarPorId(id){
        return await Suscribe.listarPorId(id);
    },
    async listarTodo(){
        return await Suscribe.listarTodo();
    },
    async guardar(obj){
        let datos = await Suscribe.BuscarSuscribe(obj);
        if(datos.length){
            return{resp:'ya cargado'}
        }else{
            let id = await Suscribe.guardar( obj );
            return {resp:id}
        }
    },
    async actualizar(obj){
        let timestamp = Date.now();
        let id = await Suscribe.actualizar({ timestamp, ...obj });
        return {id:id}
    },
    async borrarPorId(id){
        let data = await Suscribe.borrarPorId(id);
        return { delete: data }
    }
}