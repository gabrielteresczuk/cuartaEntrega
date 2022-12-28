require("dotenv").config();
/* --------- imports carrito -------- */
const CarritoDaoMemoria = require('./carritos/CarritosDaoMemoria.js');
const CarritoDaoArchivo = require('./carritos/CarritosDaoArchivo.js');
const CarritoDaoSqlite3 = require('./carritos/CarritosDaoSqlite3.js');
const CarritoDaoMariadb = require('./carritos/CarritosDaoMariadb.js');
const CarritoDaoMongodb = require('./carritos/CarritosDaoMongodb.js');
/* -------- import productos -------- */
const ProductosDaoMemoria = require('./productos/ProductosDaoMemoria.js');
const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo.js');
const ProductosDaoSqlite3 = require('./productos/ProductosDaoSqlite3.js');
const ProductosDaoMariadb = require('./productos/ProductosDaoMariadb.js');
const ProductosDaoMongodb = require('./productos/ProductosDaoMongodb.js');
/* ---------- imports chats --------- */
const ChatsDaoMariadb = require('./chats/ChatsDaoMariadb.js');
const ChatsDaoSqlite3 = require('./chats/ChatsDaoSqlite3.js');
const ChatsDaoMemoria = require('./chats/ChatsDaoMemoria.js');
const ChatsDaoArchivo = require('./chats/ChatsDaoArchivo.js');
const ChatsDaoMongodb = require('./chats/ChatsDaoMongodb.js');
/* -------- imports usuarios -------- */
const UsuariosDaoMemoria = require('./usuarios/UsuariosDaoMemoria.js');
const UsuariosDaoArchivo = require('./usuarios/UsuariosDaoArchivo.js');
const UsuariosDaoSqlite3 = require('./usuarios/UsuariosDaoSqlite3.js');
const UsuariosDaoMariadb = require('./usuarios/UsuariosDaoMariadb.js');
const UsuariosDaoMongodb = require('./usuarios/UsuariosDaoMongodb.js');
/* -------- imports suscribe -------- */
const SuscribeDaoMemoria = require('./suscribe/SuscribeDaoMemoria.js');
const SuscribeDaoArchivo = require('./suscribe/SuscribeDaoArchivo.js');
const SuscribeDaoSqlite3 = require('./suscribe/SuscribeDaoSqlite3.js');
const SuscribeDaoMariadb = require('./suscribe/SuscribeDaoMariadb.js');
const SuscribeDaoMongodb = require('./suscribe/SuscribeDaoMongodb.js');
/* -------- imports contacto -------- */
const ContactoDaoMemoria = require('./contacto/ContactoDaoMemoria.js');
const ContactoDaoArchivo = require('./contacto/ContactoDaoArchivo.js');
const ContactoDaoSqlite3 = require('./contacto/ContactoDaoSqlite3.js');
const ContactoDaoMariadb = require('./contacto/ContactoDaoMariadb.js');
const ContactoDaoMongodb = require('./contacto/ContactoDaoMongodb.js');
/* -------- imports favorito -------- */
const FavoritoDaoMemoria = require('./favorito/FavoritoDaoMemoria.js');
const FavoritoDaoArchivo = require('./favorito/FavoritoDaoArchivo.js');
const FavoritoDaoSqlite3 = require('./favorito/FavoritoDaoSqlite3.js');
const FavoritoDaoMariadb = require('./favorito/FavoritoDaoMariadb.js');
const FavoritoDaoMongodb = require('./favorito/FavoritoDaoMongodb.js');
/* --------- imports ordenes -------- */
const OrdenesDaoMemoria = require('./ordenes/OrdenesDaoMemoria.js');
const OrdenesDaoArchivo = require('./ordenes/OrdenesDaoArchivo.js');
const OrdenesDaoSqlite3 = require('./ordenes/OrdenesDaoSqlite3.js');
const OrdenesDaoMongodb = require('./ordenes/OrdenesDaoMongodb.js');
const OrdenesDaoMariadb = require('./ordenes/OrdenesDaoMariadb.js');

// export condicional a la variable ENVIROMENT DAO
//console.log(process.env.DAO = 'MONGODB');


if(process.env.DAO === 'MEMORIA'){
    exports.ChatFactory     = ChatsDaoMemoria;
    exports.usuariosFactory = UsuariosDaoMemoria;
    exports.favoritoFactory = FavoritoDaoMemoria;
    exports.ordenesFactory  = OrdenesDaoMemoria;
    exports.contactoFactory = ContactoDaoMemoria;
    exports.suscribeFactory = SuscribeDaoMemoria;
    exports.Carrito         = CarritoDaoMemoria;
    exports.Producto        = ProductosDaoMemoria;
}else if(process.env.DAO === 'ARCHIVO'){
    exports.ChatFactory     = ChatsDaoArchivo;
    exports.usuariosFactory = UsuariosDaoArchivo;
    exports.favoritoFactory = FavoritoDaoArchivo;
    exports.ordenesFactory  = OrdenesDaoArchivo;
    exports.contactoFactory = ContactoDaoArchivo;
    exports.suscribeFactory = SuscribeDaoArchivo;
    exports.Carrito         = CarritoDaoArchivo;
    exports.Producto        = ProductosDaoArchivo;
}else if(process.env.DAO === 'SQLITE3'){
    exports.ChatFactory     = ChatsDaoSqlite3;
    exports.usuariosFactory = UsuariosDaoSqlite3;
    exports.favoritoFactory = FavoritoDaoSqlite3;
    exports.ordenesFactory  = OrdenesDaoSqlite3;
    exports.contactoFactory = ContactoDaoSqlite3;
    exports.suscribeFactory = SuscribeDaoSqlite3;
    exports.Carrito         = CarritoDaoSqlite3;
    exports.Producto        = ProductosDaoSqlite3;
}else if(process.env.DAO === 'MARIADB'){
    exports.ChatFactory     = ChatsDaoMariadb;
    exports.usuariosFactory = UsuariosDaoMariadb;
    exports.favoritoFactory = FavoritoDaoMariadb;
    exports.ordenesFactory  = OrdenesDaoMariadb;
    exports.contactoFactory = ContactoDaoMariadb;
    exports.suscribeFactory = SuscribeDaoMariadb;
    exports.Carrito         = CarritoDaoMariadb;
    exports.Producto        = ProductosDaoMariadb;
}else if(process.env.DAO === 'MONGODB'){
    exports.ChatFactory     = ChatsDaoMongodb;
    exports.usuariosFactory = UsuariosDaoMongodb;
    exports.favoritoFactory = FavoritoDaoMongodb;
    exports.ordenesFactory  = OrdenesDaoMongodb;
    exports.contactoFactory = ContactoDaoMongodb;
    exports.suscribeFactory = SuscribeDaoMongodb;
    exports.Carrito         = CarritoDaoMongodb;
    exports.Producto        = ProductosDaoMongodb;
}



