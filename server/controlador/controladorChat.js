
const negocioChat = require('../negocios/negocioChat.js');
// socket.on - escucha 
// io.emit - envia

module.exports = {
    /*async loginChat(req,res,next){
        //res.render('login.ejs');
        res.redirect('/login');
    },*/
    /*async postLoginChat(req,res,next){
        res.json({token:req.token});
    },*/
    /* ---------- chat general ---------- */
    async cargarVista(req,res,next){
        res.render('hbs/chat_general.handlebars');
    },
    async listarTodoChatGeneral(io){
        let chats = await negocioChat.listarTodoChatGeneral();
        io.emit('chats_general',chats);
    },
    async guardarChatGeneral(chat,io){
        let nuevoChat = await negocioChat.guardarChatGeneral(chat);
    },
    /* ---------- chat privado ---------- */
    async cargarVistaPrivada(req,res,next){
        res.render('hbs/chat_privado.handlebars');
    },
    async listarTodoChatPrivado(io){
        let chats = await negocioChat.listarTodo();
        io.emit('chats_privado',chats);
    },
    async guardarChatPrivado(chat,io,email){
        let nuevoChat = await negocioChat.guardarChat(chat,email);
    },
    /* ---------- chat sistema ---------- */
    async cargarVistaSistema(req,res,next){
        res.render('hbs/chat_sistema.handlebars');
    },
    async listarTodoSistema(io){
        let chats = await negocioChat.listarTodo();
        io.emit('chats_sistema',chats);
    },
    /* ------- chat sistema email ------- */
    async cargarVistaSistemaEmail(req,res,next){
        console.log('cargar vista EMAIL');
        let {email} = req.params;
        res.render('hbs/chat_sistema_email.handlebars',{email:email});
    },

    /*async listarTodoPorEmail(io,email){
        let chats = await negocioChat.listarTodoPorEmail(email);
        io.emit('chats',chats);
    },
    async listarTodoPorEmailSistema(io,email){
        let chats = await negocioChat.listarTodoPorEmail(email);
        //console.log(chats);
        io.emit('chatsSistema',chats);
    }*/
}