const logger = require('../utils/logger/logger.js'); // -> logger
const controllerChat = require('../controlador/controladorChat.js');

chats = async (socket,io) =>{

        logger.log('info', `Socket: se conecto un cliente`);

        //email = 'tere@gmail.com';

        /* ---------- chat general ---------- */

        await controllerChat.listarTodoChatGeneral(io);                 //-> emite

        socket.on('guardarChatGeneral',                                 //-> escucha
        async chat=>{
                await controllerChat.guardarChatGeneral(chat,io);
                await controllerChat.listarTodoChatGeneral(io);
        });

        /* ---------- chat privado ---------- */

        await controllerChat.listarTodoChatPrivado(io);                 //-> emite

        socket.on('guardarChatPrivado',                                 //-> escucha
        async chatPrivado=>{
                //console.log(chatPrivado);
                await controllerChat.guardarChatPrivado(chatPrivado.chat,io,chatPrivado.email);
                await controllerChat.listarTodoChatPrivado(io);
        });

        /* ---------- chat sistema ---------- */

        await controllerChat.listarTodoSistema(io);                     //-> emite

        socket.on('buscarChatSistema',
        async email=>{
                //console.log(email);
                await controllerChat.listarTodoPorEmailSistema(io,email);
        });


}

module.exports = chats