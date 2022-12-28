const logger = require('../utils/logger/logger.js'); // -> logger
const {nuevoRegistro} = require('../utils/nodemailer.js');
const jwt = require("jsonwebtoken");
const negocioLogin = require('../negocios/negocioLogin.js');

module.exports = {

    async getSignIn(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);

        if(req.isAuthenticated()){
          logger.log('info', `User Logueado`);
            res.send(req.user);
        }else{
          logger.log('info', `User no Logueado`);
            res.send({})
        }
    },

    async postSignIn(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const token = jwt.sign({ data: req.user }, "myprivatekey", { expiresIn: "24h" });

        res.send({datos:req.user, token});
    },

    async postSignUp(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);

        //nuevoRegistro(req.body)     // ->  envio EMAIL
      
        const file= req.file;
        if(!file){
            res.send({file:'error'});
        }
        res.send({resp:'ok'});
    },

    async getLogout(req,res,next){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);

        if(req.user){
        let {username} = req.user;
          req.logout(()=>{
            res.send({logout:username});
          });
        }else{
           res.send({logout:'ya deslogueado'});
        }
    },

    async deleteUsuario(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
      const {administrador} = req.body;
      const { id } = req.params;

      if (administrador) {
        let datos = await negocioLogin.borrarUsuarioPorId(id);
        res.json(datos);
      } else {
        res.json({error: -1,descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`});
      }
    },

    async putUsuario(req,res,next){
      logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        const {administrador} = req.body;
        const { id } = req.params;
        const usuario = {...req.body};
        delete usuario.id;
        delete usuario.administrador;
    
        if (administrador) {
          let datos = await negocioLogin.actualizarUsuario({ id: id, ...usuario })
          res.json(datos);
        } else {
          res.json({error: -1,descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`});
        }
    },



}