
const socket = io.connect();

const chat_msg = document.getElementById('chat_msg');

        /* ------------- logout ------------- */
        const chat_logout = document.getElementById('chat_logout');
        chat_logout.addEventListener('click',()=>{
            localStorage.clear();
            window.location.href = '/login'; //relative to domain
        })

/* ----------- al ingresar ---------- */


socket.on('chats_sistema',chats=>{

    let templateChats;

    if(chats.length){
        templateChats = chats.map(el=>{

            return `
            <div class="chat_msg_sistema"}>
            <div class="chat_msg_bg_sistema"}>
                <div class="chat_msg_img">
                <img src="/uploads/${el.mensajes[0].avatar}" alt="">
                </div>
                <div class="chat_msg_textos">
                    <div class="chat_msg_textos_cab">
                        <h4>${el.email}</h4>


                    </div>
                    <div>
                        <p>${el.mensajes[el.mensajes.length-1].fecha}</p>
                    </div>
                
                </div>
                    <div class="chat_sistema_btn_cont">
                        <a href="sistema/${el.email}" class="chat_sistema_btn">RESPONDER</a>
                    </div>
                </div>

            </div>
            `
            }).join('');
            
    }

    chat_msg.innerHTML=templateChats;
})

