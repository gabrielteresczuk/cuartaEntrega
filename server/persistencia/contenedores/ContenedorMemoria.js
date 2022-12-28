
class ContenedorMemoria {

    constructor(){
        this.elementos = [];
    }

    proximoID = (arr) =>{
        if(arr.length > 0){
            let ids = arr.map(el => el.id);
            const max = Math.max.apply(null, ids);
            return max+1;
        }else{
            return 1;
        }
    }

    guardar = async (obj) =>{
        try {
            let datos = await this.listarTodo();
            let proximoId = this.proximoID(datos);
            obj = {...obj,id:proximoId.toString(),'_id':proximoId.toString()};
            this.elementos.push(obj);
            return proximoId.toString();
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }
    }

    listarPorId = async (id) =>{
        try {
            let producto = this.elementos.find(el => el.id === id);
            if(producto === undefined){
                return {};
            }else{
                return producto;
            }
        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }
    }


    listarTodo = async () =>{
        try {
            return [...this.elementos];
        } catch (error) {
            return [];
        }
    }

    borrarPorId = async (id) =>{
        try {
            let existe = await this.listarPorId(id);

            if(existe?.id){
                let nuevosDatos = this.elementos.filter(producto => producto.id !== id);
                this.elementos = [...nuevosDatos];
                return 1;
            }else{
                return null;
            }


        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
            return null;
        }
    }

    borrarTodo = async () => {
        try {
            this.elementos = [];
            return 'todos los elementos eliminados';
        } catch (error) {
            console.log('deleteAll - ocurrio un error:' + error);
        }
    }

    actualizar = async (obj)=>{
        try {
            
            let existe = await this.listarPorId(obj.id);

            if(existe?.id){
                let nuevoDatos = this.elementos.map(el => el.id === obj.id ? obj:el);
                this.elementos = nuevoDatos;
                return obj.id;
            }else{
                return null;
            }


        } catch (error) {
            console.log('Actualizar - error al actualizar');
            return null
        }
    }

}

module.exports = ContenedorMemoria;