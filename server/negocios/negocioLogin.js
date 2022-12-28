const {usuariosFactory} = require('../persistencia/dao/factory.js');
const usuarios = new usuariosFactory();

const bCrypt = require("bcrypt");                           //-> encriptado
function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

module.exports = {

    async buscarUsuario(objetoUsuario){
        return await usuarios.buscar(objetoUsuario);
    },

    async guardarUsuario(objetoUsuario){
        objetoUsuario.password = createHash(objetoUsuario.password);
        return await usuarios.guardar(objetoUsuario);
    },

    async listarPorId(obj){
        return await usuarios.listarPorId(obj);
    },

    async borrarUsuarioPorId(id){
        let data =  await usuarios.borrarPorId(id);
        return { delete: data }
    },
    async actualizarUsuario(obj){
        obj.password = createHash(obj.password);
        let id = await usuarios.actualizar(obj);
        return {id:id}
    },


}