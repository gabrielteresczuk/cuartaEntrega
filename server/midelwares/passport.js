const passport = require("passport");                       //-> passport
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;   //-> estrategia

const bCrypt = require("bcrypt");                           //-> encriptado
const logger = require('../utils/logger/logger.js');              // -> logger
const negocioLogin = require('../negocios/negocioLogin.js');
const {config} = require('../config.js');

/* ---------- serializacion --------- */

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

/* ------------ funciones ----------- */

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}


/* ----------- middelware ----------- */

passport.use("login",
  new LocalStrategy(async (username, password, done) => {
    try {
      //buscamos el usuario en la DB
      let user = await negocioLogin.buscarUsuario({username});

      if (user) {
        if (isValidPassword(user, password)) {
          // usuario valido, pasa!
          return done(null, user);
        } else {
          // password incorrecto
          return done(null, false);
        }
      } else {
        // no existe el usuario
        return done(null, false);
      }
    } catch (error) {
      logger.log('error', `Passport - login Strategy - ` + error);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        let datos = await negocioLogin.buscarUsuario({username:username});
        if (datos) {
          return done(null, false,{ message: 'Incorrect username or password.' });
        } else {
          let { username, password} = req.body;
          let avatar = req.file.filename;
          // creamos el nuevo usuario

          let user = await negocioLogin.guardarUsuario({
            ...req.body,
            password: password,
            avatar:avatar
          });
          
          let datos = await negocioLogin.listarPorId(user);
          return done(null, datos);
        }
      } catch (error) {
        logger.log('error', `Passport - Singup Strategy - ` + error);
      }
    }
  )
);



const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//opts.jwtFromRequest= ExtractJwt.fromUrlQueryParameter('secret_token');
opts.secretOrKey = config.JWT_SECRET;
opts.jsonWebTokenOptions = {
  expiresIn : 60*config.SESSION_MIN,
  maxAge:60*config.SESSION_MIN
}

passport.use(new JwtStrategy(opts,async function(token, done) {
  try {

    let user = await negocioLogin.buscarUsuario({username:token.data.username});

    if (user) {
        // usuario valido, pasa!
        return done(null, user);

    } else {
      // no existe el usuario
      return done(null, false);
    }
  } catch (error) {
    logger.log('error', `Passport - login Strategy - ` + error);
  }

}));



module.exports = passport;