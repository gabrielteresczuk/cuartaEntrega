document.addEventListener("DOMContentLoaded", () => {

    token = localStorage.getItem("vs_token");

    const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        credentials: 'include'
      };
      fetch(`http://localhost:8080/signin`, requestOptions)
      .then((response) => {
        // si es 401 es por que no esta autorizado
        if (response.status !== 200) {
            window.location.href = '/login'; //relative to domain
        } else {
          return response.json();
        }
      })
        .then((data) => {
          // carga el usuario logeado

          let username = null;
          username = data.username;
          let avatar = data.avatar;
        
        const socket = io.connect();

        /* -------- envio formulario -------- */

        const chat_form = document.getElementById('chat_form');
        const chat_text = document.getElementById('chat_text');
        const chat_msg = document.getElementById('chat_msg');
        const chat_username = document.getElementById('chat_username');
        const chat_privado = document.getElementById('chat_privado');


        chat_username.innerHTML = username;
        chat_privado.href = 'chat/'+username;


        /* ----------- al ingresar ---------- */


        socket.on('chats_general',chats=>{

            let templateChats = `
            <div class="chat_msg_2"}>
            <div class="chat_msg_bg2"}>
                <div class="chat_msg_img">
                    <img src="./views/img/admin.png" alt="">
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

            if(chats){
               
                templateChats += chats.mensajes.map(el=>{

                    return `
                    <div class=${el.tipo==='usuario' ? "chat_msg" : "chat_msg_2"}>
                    <div class=${el.tipo==='usuario' ? "chat_msg_bg" : "chat_msg_bg2"}>
                        <div class="chat_msg_img">
                         <img src=${el.tipo==='usuario' ? "/uploads/"+el.avatar : "/views/img/admin.png"} alt="">
                        </div>
                        <div class="chat_msg_textos">
                            <div class="chat_msg_textos_cab">
                                <h4>${el.tipo==='usuario' ? el.email : "Sistema"}</h4>
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

        //envio de chat
        chat_form.addEventListener('submit',(event)=>{
            event.preventDefault();


            let chat = {
                email:username,
                avatar:avatar,
                tipo:'usuario',
                fecha:new Date().toLocaleString(),
                texto:chat_text.value
            }

            socket.emit('guardarChatGeneral',chat);

            chat_text.value='';
            chat_text.focus();

        })

        /* ------------- logout ------------- */
        const chat_logout = document.getElementById('chat_logout');
        chat_logout.addEventListener('click',()=>{
            localStorage.clear();
            window.location.href = '/login'; //relative to domain
        })

    });

});