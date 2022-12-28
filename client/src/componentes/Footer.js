import React, { useContext, useState } from 'react'
import { CarritoContext } from "../context/CarritoContext";
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import './Footer.css'



function Footer() {

    const { FETCHURL } = useContext(CarritoContext);

    const [suscribe, setSuscribe] = useState('');
    const [suscrito, setSuscrito] = useState(0);

    const handleSuscribe = (e) =>{
        setSuscribe(e.target.value);
    }
    
    const handleSuscribeSubmit = (e) =>{
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: suscribe }),
          };
          fetch(`${FETCHURL}/suscribe`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.resp === "ya cargado") {
                setSuscrito(2);
                setSuscribe('');
              } else {
                setSuscrito(1);
                setSuscribe('');
              }
            });
    }


  return (
    <>
        <section className="suscribe_cont">
        <div className="suscribe">
            <div className="suscribe_ayuda">
                <b>NECESITAS AYUDA? CONTACTANOS!</b>
                <p>SOPORTE LAS 24/7 AL NRO 37645820XX</p>
            </div>
            <div className="suscribe_form_cont">
                {!suscrito ? 
                <form className="suscribe_form" method='post' action='/suscribe' onSubmit={handleSuscribeSubmit}>
                <div className="suscribe_form_input">
                    <span className="material-symbols-outlined">
                        mail
                    </span>
                    <input type="email" placeholder="Ingresa tu email" value={suscribe} onChange={handleSuscribe} required/>
                </div>
                <div className="suscribe_button_cont">
                    <input type="submit" className="suscribe_button" value="SUSCRIBITE"/>
                </div>
                </form>
                : 
                    suscrito === 1 ?

                    <div className="suscribe_greet">
                    <span className="material-symbols-outlined">
                        check_circle
                    </span>
                    <div className='suscribe_greet_text'>
                        <h3>Muchas gracias por suscribirte!</h3>
                        <p>Todo el contenido a tu alcance.</p>
                    </div>
                    </div>
                    :
                    <div className="suscribe_greet">
                    <span className="material-symbols-outlined">
                        hand_gesture
                    </span>
                    <div className='suscribe_greet_text'>
                        <h3>Ya estas Suscrito al Newsletter</h3>
                        <p>Gracias por seguir apoyando!</p>
                    </div>

                    </div>
                    
                }
                
            </div>
        </div>
    </section>

    <footer className="footer_bg">

<div className="footer_cont">
    <div className="footer">
        <div className="footer_col">
            <b>PRODUCTOS</b>
            <hr/>
            <ul>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <Link to={"/Productos"}>Todos</Link>
                </li>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <Link to={"/Productos/gpu"}>Placa de Video</Link>
                </li>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <Link to={"/Productos/mem"}>Memoria RAM</Link>
                </li>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <Link to={"/Productos/cpu"}>Procesadores</Link>
                </li>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <Link to={"/Productos/hdd"}>Discos</Link>
                </li>
            </ul>
        </div>
        <div className="footer_col">
            <b>SERVICIOS</b>
            <hr/>
            <ul>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <HashLink smooth to={"/Acerca#nosotros"}>Nosotros</HashLink>
                </li>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <HashLink smooth to={"/Acerca#venta"}>Venta</HashLink>
                </li>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <HashLink smooth to={"/Acerca#envios"}>Envios</HashLink>
                </li>
                <li>
                    <span className="material-symbols-outlined">arrow_right</span>
                    <HashLink smooth to={"/Acerca#testimonial"}>Testimonial</HashLink>
                </li>
            </ul>
        </div>
        <div className="footer_col">
            <b>MI CUENTA</b>
            <hr/>
            <ul>
            <li>
                <span className="material-symbols-outlined">arrow_right</span>
                <Link to={"/login"}>Login</Link>
            </li>
            </ul>
        </div>
        <div className="footer_col footer_col_color">
            <b>CONTACTO</b>
            <hr/>
            <ul className="footer_contactos">
            <li>
                <span className="material-symbols-outlined"> pin_drop  </span>
                Argentina, Misiones, Posadas Calle Fake 3956
            </li>
            <li>
                <span className="material-symbols-outlined"> call  </span>
                +54 9 3764 5820XX
            </li>
            <li>
                <span className="material-symbols-outlined"> mail  </span>
                contacto@virtualstore.com
            </li>
            </ul>
        </div>
    </div>

</div>

</footer>

    </>
  )
}

export default Footer