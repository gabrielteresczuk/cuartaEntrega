// npm install knex sqlite3 mysql

class ContenedorSqlite3Mariadb {

    constructor(knex,tabla,esquema){
        this.knex = knex;
        this.tabla = tabla;
        this.esquema = esquema;
        this.crearTabla();
    }

    crearTabla = async () =>{

        try {

            let existe = await this.knex.schema.hasTable(this.tabla);
            if(existe){
                //console.log(`'${this.tabla}' ya existe`)
            }else{

                await this.knex.schema.createTable(this.tabla,(table) => {
                    this.esquema(table)
                });
                console.log(`'${this.tabla}' creada`);
            }
            
        } catch (error) {
            console.log(error);
        }finally{
            //this.knex.destroy();
        }

    }

    guardar = async (obj) =>{
        try {
            await this.crearTabla();
            if(obj.hasOwnProperty('productos')){
                obj.productos='';
            }
            let guardar = await this.knex(this.tabla).insert(obj);
            return guardar;
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }finally{
           // this.knex.destroy();
        }
    }

    listarPorId = async (id) =>{
        try {
            let datos = await this.knex(this.tabla).select('*').where({id:id});
            if(datos.length){
                
                datos[0]['_id'] = datos[0].id;
                
                return datos[0];
            }else{
                return {};
            }
            

        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }finally{
           // this.knex.destroy();
        }
    }


    listarTodo = async () =>{
        try {
            let datos = await this.knex(this.tabla).select('*');
            
            if(datos[0]?.mensajes){
                datos.map(el => el.mensajes = JSON.parse(el.mensajes));
            }
            return datos;
        } catch (error) {
            return [];
        }finally{
           // this.knex.destroy();
        }
    }

    borrarPorId = async (id) =>{
        try {
            let borrar = await this.knex(this.tabla).where({id:id}).del();
            if(borrar){
                return borrar
            }else{
                return null
            }
        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
        }finally{
           // this.knex.destroy();
        }
    }

    borrarTodo = async () => {
        try {
            await this.knex(this.tabla).del();

        } catch (error) {
            console.log('BorrarTodo - ocurrio un error:' + error);
        }finally{
           // this.knex.destroy();
        }
    }

    actualizar = async (obj)=>{
        try {
            let actualizar = await this.knex(this.tabla).where({id:obj.id}).update(obj);
            if(actualizar){
                return obj.id
            }else{
                return null
            }

            
        } catch (error) {
            console.log('Actualizar -ocurrio un error:' +error);
        }
    }

}

module.exports = ContenedorSqlite3Mariadb;