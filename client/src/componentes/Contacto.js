import React, { useContext, useEffect, useState } from 'react'
import { CarritoContext } from "../context/CarritoContext";


let initailForm = {
  apellido: "",
  nombre: "",
  email: "",
  telefono: "",
  texto: "",
};

function Contacto() {

  const { FETCHURL,setToken} = useContext(CarritoContext);

  const [form, setForm] = useState(initailForm);
  const [enviado, setEnviado] = useState(false);
  const token_local = localStorage.getItem("vs_token");

  useEffect(() => {
    if(token_local){
      setToken(token_local);
    }else{
        setToken('');
    }
  }, [token_local,setToken]);
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( form ),
    };
    fetch(`${FETCHURL}/contacto`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setEnviado(true);
        }
      });

  };

  return (
    <div className='Contacto'>
        <div className='Contacto_cont'>


                <div className="contacto_hero_cont">
                    <div className='contacto_hero_text'>
                      <h1>CONTACTO</h1>
                      <h3>Contacta con nosotros!</h3>
                      <h5>Estaremos contentos de ayudarte! Puedes hacernos llegar todas tus dudas</h5>
                      <h5>¡Te esperamos!</h5>
                    </div>
                    <div className='contacto_hero'> </div>
                </div>

                <div className='contact_form_tit'>
                  <h3>¿Queres que te ayudemos? ¡Completa el formulario!</h3>
                  <p>Completa el formulario y en breve nos contactaremos contigo.</p>
                </div>



        </div>
                <div className='contacto_form_bg'>
                <div className='contacto_wave1'></div>
                {!enviado?
                  <form className='contacto_form_cont' onSubmit={handleSubmit}>
                  
                  <div className='contacto_form_fila_tit'>
                    <h1>FORMULARO</h1>
                    <span className="material-symbols-outlined">
                      menu_book
                    </span>
                  </div>
                  <div className='contacto_form_fila'>
                    <p>Todos los campos son de caracter obligatorio.</p>
                  </div>
                    <div className='contacto_form_fila'>
                      <input type="text" className='contacto_input' id="apellido" name='apellido' placeholder='Apellido' required onChange={handleChange} value={form.apellido}/>
                      <input type="text" className='contacto_input' id="nombre" name='nombre' placeholder='Nombre' required onChange={handleChange} value={form.nombre}/>
                    </div>
                    <div className='contacto_form_fila'>
                      <input type="text" className='contacto_input' id="email" name='email' placeholder='Email' required onChange={handleChange} value={form.email}/>
                      <input type="text" className='contacto_input' id="telefono" name='telefono' placeholder='Telefono' required onChange={handleChange} value={form.telefono}/>
                    </div>
                    <div className='contacto_form_fila'>
                      <textarea className='contacto_input' rows="4" cols="50" name="texto" id="texto" placeholder='Inserta tu texto aqui...' onChange={handleChange} value={form.texto}/>
                    </div>
                    <div className='contacto_form_fila'>
                      <input type="submit" className='contacto_bnt_enviar' value="Enviar Consulta!"></input>
                    </div>

                  </form>
                  : 
                  <div className='contacto_greet'>
                    <div className='contacto_greet_fila'>

                        <span class="material-symbols-outlined">
                        sentiment_very_satisfied
                        </span>

                      <div>
                        <h2>Consulta enviada Correctamente!</h2>
                        <p>En breve nos pondremos en contacto con usted para solucionar sus inquietudes.</p>
                      </div>
                    </div>
                  </div>
                  }
                  <div className='contacto_wave'></div>

                </div>
    
    </div>
    
  )
}

export default Contacto