/* -------- express y router -------- */
const express = require("express");
const { Router } = express;
const router = Router();
const controladorLogin = require('../controlador/controladorLogin.js')
const passport = require('../midelwares/passport.js');                  // sesiones
const upload = require('../midelwares/multer.js');                      // multer imagen

// login
router.get('/signin',passport.authenticate('jwt',{ session: false }),controladorLogin.getSignIn);
router.post('/signin',passport.authenticate('login'), controladorLogin.postSignIn);
// register
router.post('/signup',upload.single('avatar'),passport.authenticate('signup'),controladorLogin.postSignUp);
// logout
router.get('/logout', controladorLogin.getLogout);
router.put('/usuario/:id', controladorLogin.putUsuario);
router.delete('/usuario/:id', controladorLogin.deleteUsuario);



module.exports = router;
