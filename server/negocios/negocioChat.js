
const {ChatFactory} = require('../persistencia/dao/factory.js');
const chats = new ChatFactory();


module.exports = {
    async listarTodo(){
        let chat = await chats.listarTodo();
        return chat;
    },
    async guardarChat(chat,email){
        //let nuevoChat = await chats.guardar(chat);
        let nuevoChat = await chats.guardarMensajePorEmail(chat,email);
        return nuevoChat;
    },
    async listarTodoPorEmail(email){
        let datos = await chats.listarTodoPorEmail(email);
        return datos;
    },
    async listarTodoChatGeneral(){
        let datos = await chats.listarTodoPorEmail('general');
        return datos; 
    },
    async guardarChatGeneral(chat){
        //let nuevoChat = await chats.guardar(chat);
        let nuevoChat = await chats.guardarMensajePorEmail(chat,'general');
        return nuevoChat;
    }


}