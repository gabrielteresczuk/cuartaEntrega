const { Producto } = require("../persistencia/dao/factory.js");
const Productos = new Producto();
const { Carrito } = require("../persistencia/dao/factory.js");
const Carritos = new Carrito();

module.exports = {
    async guardar(obj){
        let timestamp = Date.now();
        let datos = await Carritos.guardar({
            ...obj,
            timestamp,
            productos: [],
            cerrado: false,
        });
        return {id:datos}
    },

    async borrarPorId(id){
        let datos = await Carritos.borrarPorId(id);
        return {delete:datos}
    },

    async buscarCarritoPorUsuario(id){
        return await Carritos.buscarCarritoPorUsuario(id);
    },

    async listarProductosPorId(id){
        return await Carritos.listarProductosPorId(id);
    },

    async buscarCarritoTerminadoPorUsuario(id){
        return await Carritos.buscarCarritoTerminadoPorUsuario(id);
    },

    async terminarCarrito(id){
        return await Carritos.terminarCarrito(id);
    },

    async guardarProducto(id,producto,cantidad){
        return await Carritos.guardarProducto(id,{...producto,cantidad});
    },

    async borrarProductoPorId(id, id_prod){
        return await Carritos.borrarProductoPorId(id, id_prod);
    }
}