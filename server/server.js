const express = require("express");
const app = express();
require("dotenv").config();                         // -> .env
const path = require("path");
const logger = require('./utils/logger/logger.js'); // -> logger
const session = require('express-session');         // -> session
const { engine } = require('express-handlebars');
const {config} = require('./config.js');
const cors = require('./midelwares/cors.js');

/* ------------- CLUSTER ------------ */

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

/* ---------- HTTP Y SOCKET --------- */

const { Server: HttpServer } = require('http')
const httpServer = new HttpServer(app)
const { Server: Socket } = require('socket.io')
const io = new Socket(httpServer)

/* -------- HABILITAMOS CORS -------- */

app.use(cors);

/* ----------- middelwares ---------- */


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "build")));

app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', (__dirname + '/build/views'));

/* ------------- session ------------ */

const sessionConfig = require('./midelwares/session.js');
app.use(session(sessionConfig));

/* ------------ passport ------------ */

const passport = require('./midelwares/passport.js');
app.use(passport.initialize());
app.use(passport.session());

/* -------------- RUTAS ------------- */

const rutaProducto = require('./rutas/rutaProducto.js');
const rutaCarrito = require('./rutas/rutaCarrito.js');
const rutaOrdenes = require('./rutas/rutaOrdenes.js');
const rutaExtra = require('./rutas/rutaExtra.js');
const rutaLogin = require('./rutas/rutaLogin.js');
const rutaChats = require('./rutas/rutaChat.js');

io.on('connection',(socket)=>rutaChats(socket,io));
app.use(rutaProducto);
app.use(rutaCarrito);
app.use(rutaOrdenes);
app.use(rutaLogin);
app.use(rutaExtra);

/* ------------ listener ------------ */

const modo = config.MODO;
const port = config.PORT;

if(cluster.isMaster){
  logger.log('info', `ARGUMENTOS puerto: ${port} - modo: ${modo}`);
  logger.log('info', 'master '+process.pid +' is running');

  if (modo === 'CLUSTER'){
      for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }

      cluster.on('exit',(worker,code,signal)=>{
          logger.log('info', `worker ${worker.process.pid} died`);
      })
  }else{
      const server = httpServer.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
      server.on('error',(error)=>{logger.log('error', 'hubo un error '+error)});
  }

}else{

  const server = httpServer.listen(port,()=>{logger.log('info', `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`)});
  server.on('error',(error)=>{logger.log('error', 'hubo un error '+error)});

}

