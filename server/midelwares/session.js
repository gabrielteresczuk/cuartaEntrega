const {config} = require('../config.js'); // => configuracion por argumentos
const {mongodbConfig} = require('../config.js');


const MongoStore = require('connect-mongo');
const sessionConfig={
    store:MongoStore.create({mongoUrl:mongodbConfig}),
    secret:config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,                  //-> actualiza la session
    cookie: {
        maxAge: 1000 * 60 * config.SESSION_MIN      //-> ms * seg * min               
    }
};

module.exports = sessionConfig