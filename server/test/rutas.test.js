const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const path = require('path');

//console.log(path.resolve(__dirname, "test.png"));

let producto = {
    timestamp:Date.now(),
    nombre:'Producto Prueba',
    descripcion:'Descripcion Prueba',
    codigo:'1122',
    foto:'foto.jpg',
    precio:100,
    stock:10,
    categoria:'prueba',
    subcategoria:'sub prueba',
    ranking:1,
    administrador:1
};
let productoParaActualizar  = {
    timestamp:Date.now(),
    nombre:'Producto Actualizado',
    descripcion:'Descripcion Actualizada',
    codigo:'2233',
    foto:'foto_actualizada.jpg',
    precio:222,
    stock:99,
    categoria:'prueba actualizada',
    subcategoria:'sub prueba actualizada',
    ranking:2,
    administrador:1
};

let usuario = {
    username: 'usuario@prueba.com',
    password: 'passwordprueba',
    nombre: 'usuario prueba',
    direccion: 'prueba 1122',
    edad: 10,
    telefono: '+543764582021',
    avatar: 'test.jpg',
}
let usuarioParaActualizar = {
    username: 'usuario@prueba.com',
    password: 'passwordactualizado',
    nombre: 'usuario prueba actualizado',
    direccion: 'prueba 1122 actualizado',
    edad: 21,
    telefono: '+543764582022',
    avatar: 'testactualizado.jpg',
    administrador:1
}

let idNuevo = null;
let idUsuario = null;
let TOKEN = null;
let idCarrito = null;
let idOrden = null;


describe('-> test de productos',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })

    describe('POST /producto',()=>{

        it('deberia incorporar un producto', async()=>{
            let response = await request.post('/api/productos').send(producto);
            expect(response.status).to.eql(200);
            idNuevo = response.body.id;

        });

        it('deberia comprobar los campos guardados', async()=>{
            let nuevoProducto = await request.get('/api/productos/'+idNuevo);
            expect(nuevoProducto.body.nombre).to.eql(producto.nombre);
            expect(nuevoProducto.body.descripcion).to.eql(producto.descripcion);
            expect(nuevoProducto.body.codigo).to.eql(producto.codigo);
            expect(nuevoProducto.body.foto).to.eql(producto.foto);
            expect(nuevoProducto.body.precio).to.eql(producto.precio);
            expect(nuevoProducto.body.stock).to.eql(producto.stock);
            expect(nuevoProducto.body.categoria).to.eql(producto.categoria);
            expect(nuevoProducto.body.subcategoria).to.eql(producto.subcategoria);
            expect(nuevoProducto.body.ranking).to.eql(producto.ranking);

        });

        it('deberia retornar error "no autorizado"', async()=>{
            let response = await request.post('/api/productos').send({...producto,administrador:0});
            expect(response.status).to.eql(200);
            expect(response.body).deep.eql({
                error: -1,
                descripcion: "ruta '/api/productos' método 'POST' no autorizada"
              });
        });

    })

    describe('PUT /producto',()=>{

        it('deberia actualizar un producto', async()=>{
            let response = await request.put('/api/productos/'+idNuevo).send(productoParaActualizar);
            
            expect(response.status).to.eql(200);
        });

        it('deberia comprobar los campos actualizados', async()=>{
            let productoActualizado = await request.get('/api/productos/'+idNuevo);
            expect(productoActualizado.body.nombre).to.eql(productoParaActualizar.nombre);
            expect(productoActualizado.body.descripcion).to.eql(productoParaActualizar.descripcion);
            expect(productoActualizado.body.codigo).to.eql(productoParaActualizar.codigo);
            expect(productoActualizado.body.foto).to.eql(productoParaActualizar.foto);
            expect(productoActualizado.body.precio).to.eql(productoParaActualizar.precio);
            expect(productoActualizado.body.stock).to.eql(productoParaActualizar.stock);
            expect(productoActualizado.body.categoria).to.eql(productoParaActualizar.categoria);
            expect(productoActualizado.body.subcategoria).to.eql(productoParaActualizar.subcategoria);
            expect(productoActualizado.body.ranking).to.eql(productoParaActualizar.ranking);

        });

        it('deberia devolver un error "id:null"', async()=>{
            let response = await request.put('/api/productos/1122').send(productoParaActualizar);
            expect(response.status).to.eql(200);
            expect(response.body).deep.eql({ id: null });
        });

    })
    
    describe('GET /producto',()=>{
        it('deberia retornar los productos cargados', async()=>{
            let response = await request.get('/api/productos');
            expect(response.status).to.eql(200);
        });
    })

    
    describe('GET /producto/:id',()=>{
        it('deberia retornar el producto cargado anteriormete', async()=>{
            let response = await request.get('/api/productos/'+idNuevo);
            expect(response.status).to.eql(200);
        });

        it('deberia comprobar los campos YA actualizados', async()=>{
            let productoActualizado = await request.get('/api/productos/'+idNuevo);
            expect(productoActualizado.body.nombre).to.eql(productoParaActualizar.nombre);
            expect(productoActualizado.body.descripcion).to.eql(productoParaActualizar.descripcion);
            expect(productoActualizado.body.codigo).to.eql(productoParaActualizar.codigo);
            expect(productoActualizado.body.foto).to.eql(productoParaActualizar.foto);
            expect(productoActualizado.body.precio).to.eql(productoParaActualizar.precio);
            expect(productoActualizado.body.stock).to.eql(productoParaActualizar.stock);
            expect(productoActualizado.body.categoria).to.eql(productoParaActualizar.categoria);
            expect(productoActualizado.body.subcategoria).to.eql(productoParaActualizar.subcategoria);
            expect(productoActualizado.body.ranking).to.eql(productoParaActualizar.ranking);

        });

        it('deberia devolver un objeto vacio', async()=>{
            let productoActualizado = await request.get('/api/productos/6380ba7b135aa0baaed00378');
            expect(productoActualizado.body).to.eql({});
        });

    })

    
})



describe('-> Test de Usuarios',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })


    describe('POST /usuario',()=>{

        it('deberia incorporar un usuario', async()=>{
            let response = await request.post('/signup').attach('avatar', __dirname+'/test.png').field(usuario);
            expect(response.status).to.eql(200);
            idUsuario = response.body.id;
            
        });
        
        it('deberia comprobar los campos guardados', async()=>{
            let nuevoUsuario = await request.post('/signin').send(usuario);
            idUsuario = nuevoUsuario.body.datos['_id'];
            TOKEN = nuevoUsuario.body.token;
            expect(nuevoUsuario.body.datos.username).to.eql(usuario.username);
            expect(nuevoUsuario.body.datos.nombre).to.eql(usuario.nombre);
            expect(nuevoUsuario.body.datos.direccion).to.eql(usuario.direccion);
            expect(nuevoUsuario.body.datos.telefono).to.eql(usuario.telefono);
        });
        
        it('deberia retornar error "no autorizado"', async()=>{
            let response = await request.get('/signin').send(usuario);
            expect(response.status).to.eql(401);
        });

        it('deberia retornar "autorizado + TOKEN"', async()=>{
            let response = await request.get('/signin').set('Authorization', 'bearer ' + TOKEN).send(usuario);
            expect(response.status).to.eql(200);
        });

    })
    
    describe('PUT /usuario',()=>{

        it('deberia actualizar un usuario', async()=>{
            console.log('ID USUARIO');
            console.log(idUsuario);
            let response = await request.put('/usuario/'+idUsuario).send(usuarioParaActualizar);
            expect(response.status).to.eql(200);
        });

        it('deberia comprobar los campos actualizados', async()=>{
            let response = await request.get('/signin').set('Authorization', 'bearer ' + TOKEN).send(usuarioParaActualizar);

            expect(response.body.nombre).to.eql(usuarioParaActualizar.nombre);
            expect(response.body.direccion).to.eql(usuarioParaActualizar.direccion);
            expect(response.body.edad).to.eql(usuarioParaActualizar.edad);
            expect(response.body.telefono).to.eql(usuarioParaActualizar.telefono);
        });

    })

    describe('GET /producto',()=>{
        it('deberia retornar los productos cargados', async()=>{
            let response = await request.get('/signin').set('Authorization', 'bearer ' + TOKEN).send(usuarioParaActualizar);
            expect(response.status).to.eql(200);
        });
    })
    


})

describe('->test de Suscripcion',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })

    let suscribe = {
        email:'test@prueba.com'
    }

    let idSuscribe = null;

    describe('POST /suscribe',()=>{

        it('deberia incorporar una suscripcion', async()=>{
            let response = await request.post('/suscribe').send(suscribe);
            expect(response.status).to.eql(200);
            idSuscribe = response.body.resp;
        });

    })

    describe('DELETE /suscribe',()=>{

        it('deberia ELIMINAR la suscripcion cargado anteriormente', async()=>{
            let response = await request.delete('/suscribe/'+idSuscribe);
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

    })

})


describe('-> test de Contacto',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })

    let contacto = {
        apellido: 'prueba',
        nombre: 'test',
        email: 'prueba@test.com',
        telefono: '111222333',
        texto: 'esto es una prueba'
    }

    let idContacto = null;

    describe('POST /suscribe',()=>{

        it('deberia incorporar un contacto', async()=>{
            let response = await request.post('/contacto').send(contacto);
            expect(response.status).to.eql(200);
            idContacto = response.body.resp;
        });

    })

    describe('DELETE /suscribe',()=>{

        it('deberia ELIMINAR el contacto cargado anteriormente', async()=>{
            let response = await request.delete('/contacto/'+idContacto);
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

    })

})


describe('-> test de Favorito',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })

    let idFavorito = null;

    describe('POST /favorito',()=>{

        it('deberia incorporar un favorito', async()=>{
            let favorito = {
                id_usuario: idUsuario,
                id_producto: idNuevo,
            }
            let response = await request.post('/favorito').send(favorito);
            expect(response.status).to.eql(200);
            idFavorito = response.body['_id'];
        });

    })

    describe('DELETE /favorito',()=>{

        it('deberia ELIMINAR el favorito cargado anteriormente', async()=>{
            let response = await request.delete('/favorito/'+idFavorito);
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

    })

})



describe('-> test de Carrito',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })

    

    describe('POST /carrito',()=>{

        it('deberia incorporar un carrito', async()=>{
            let response = await request.post('/api/carrito').set('Authorization', 'bearer ' + TOKEN).send({id_usuario:idUsuario});
            expect(response.status).to.eql(200);
            idCarrito = response.body.id;
        });

        it('deberia incorporar un producto al carrito', async()=>{
            let response = await request.post('/api/carrito/'+idCarrito+'/productos').set('Authorization', 'bearer ' + TOKEN).send({id_prod:idNuevo,cantidad:2});
            expect(response.status).to.eql(200);
        });


    })


})

describe('-> test de Ordenes',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })

    describe('POST /orden',()=>{

        it('deberia incorporar una orden', async()=>{
            let orden = {
                username:usuario.username,
                nombre:usuarioParaActualizar.nombre,
                id_carrito:idCarrito
            }
            let response = await request.post('/api/ordenes').set('Authorization', 'bearer ' + TOKEN).send(orden);
            expect(response.status).to.eql(200);

            idOrden = response.body.resp;
        });

    })
})



describe('-> test de Eliminacion',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })
    describe('DELETE /orden',()=>{

        it('deberia ELIMINAR la orden cargada anteriormente', async()=>{
            let response = await request.delete('/api/ordenes/'+idOrden).set('Authorization', 'bearer ' + TOKEN);
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

    })

    describe('DELETE /carrito',()=>{

        it('deberia ELIMINAR el carrito cargado anteriormente', async()=>{
            let response = await request.delete('/api/carrito/'+idCarrito).set('Authorization', 'bearer ' + TOKEN);
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

    })

    describe('DELETE /producto',()=>{

        it('deberia ELIMINAR el producto cargado anteriormente', async()=>{
            let response = await request.delete('/api/productos/'+idNuevo).send({administrador:1});
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

        it('deberia devolver un error "id invalido"', async()=>{
            let productoAEliminar =  await request.delete('/api/productos/1122').send({administrador:1});
            expect(productoAEliminar.body).to.eql({ delete: null });
        });
    })

    describe('DELETE /usuario',()=>{

        it('deberia ELIMINAR el usuario cargado anteriormente', async()=>{
            let response = await request.delete('/usuario/'+idUsuario).send({administrador:1});
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

        it('deberia devolver un error "id null"', async()=>{
            let response =  await request.delete('/usuario/1122').send({administrador:1});
            expect(response.body).to.eql({ delete: null });
        });

    })


})