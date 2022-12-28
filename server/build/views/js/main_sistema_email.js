
const socket = io.connect();

/* -------- envio formulario -------- */

const chat_form = document.getElementById('chat_form');
const chat_text = document.getElementById('chat_text');
const chat_msg = document.getElementById('chat_msg');

const chat_email = document.getElementById('chat_email');



/* ----------- al ingresar ---------- */


socket.on('chats_privado',chats=>{



    let chatUsername = chats.filter(el => el.email === chat_email.value);


    let templateChats = `
    <div class="chat_msg_2"}>
    <div class="chat_msg_bg2"}>
        <div class="chat_msg_img">
            <img src="/views/img/admin.png" alt="">
        </div>
        <div class="chat_msg_textos">
            <div class="chat_msg_textos_cab">
                <h4>Ayuda</h4>
                <b>${new Date().toLocaleString()}</b>
            </div>
            <div>
                <p>Bienvenido al Chat, realiza una consulta!</p>
            </div>
        
        </div>
        </div>
    </div>
    `;

    if(chatUsername[0]){
        templateChats += chatUsername[0].mensajes.map(el=>{

            return `
            <div class=${el.tipo==='usuario' ? "chat_msg" : "chat_msg_2"}>
            <div class=${el.tipo==='usuario' ? "chat_msg_bg" : "chat_msg_bg2"}>
                <div class="chat_msg_img">
                <img src=${el.tipo==='usuario' ? "/uploads/"+el.avatar : "/views/img/admin.png"} alt="">
                </div>
                <div class="chat_msg_textos">
                    <div class="chat_msg_textos_cab">
                        <h4>${el.tipo==='usuario' ? chatUsername[0].email : "Servicio al Cliente"}</h4>
                        <b>${el.fecha}</b>
                    </div>
                    <div>
                        <p>${el.texto}</p>
                    </div>
                
                </div>
                </div>
            </div>
            `
            }).join('');
            
    }

    chat_msg.innerHTML=templateChats;
    chat_msg.scrollTop = chat_msg.scrollHeight;
})

/* ------------- cargas ------------- */
chat_form.addEventListener('submit',(event)=>{
    event.preventDefault();



    let chatPrivado = {
        email :chat_email.value,
        chat : {
            tipo:'sistema',
            fecha:new Date().toLocaleString(),
            texto:chat_text.value
        }
    }

    socket.emit('guardarChatPrivado',chatPrivado);

    chat_text.value='';
    chat_text.focus();

})

        /* ------------- logout ------------- */
        const chat_logout = document.getElementById('chat_logout');
        chat_logout.addEventListener('click',()=>{
            localStorage.clear();
            window.location.href = '/login'; //relative to domain
        })
