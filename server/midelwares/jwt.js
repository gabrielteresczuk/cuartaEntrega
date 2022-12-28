const jwt = require("jsonwebtoken");
const {config} = require('../config.js');
//const PRIVATE_KEY = "myprivatekey";
const negocioLogin = require("../negocios/negocioLogin.js");
const bCrypt = require("bcrypt"); //-> encriptado

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

async function generateToken(user) {
  const token = jwt.sign({ data: user }, config.JWT_SECRET, { expiresIn: 60*config.SESSION_MIN });
  return token;
}

async function login(req, res, next) {
  console.log("post login");
  const { username, password } = req.body;

  const usuario = await negocioLogin.buscarUsuario(req.body);
  if (!usuario) {
    res.sendStatus(401);
  } else {
    if (isValidPassword(usuario, password)) {
      console.log("VALIDADO");
      const access_token = await generateToken(usuario);
      TOKEN = access_token;
      req.token = TOKEN;
      next();
    } else {
      res.sendStatus(401);
    }
  }
}

function auth(req, res, next) {
  console.log("auth");
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.render("login");
  }

  const token = authHeader.split(" ")[1];

  if (token === "null") {
    res.sendStatus(401);
  } else {
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        res.render("login");
      }
      req.user = decoded.data;
      res.json(req.user);
    });
  }
}

module.exports = { auth, login };
