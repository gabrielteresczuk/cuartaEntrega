import React, { useContext, useEffect } from 'react'
import { CarritoContext } from "../context/CarritoContext";
import './Acerca.css'
import test01 from "../images/t01.jpg";
import test02 from "../images/t02.jpg";
import test03 from "../images/t03.jpg";

function Acerca() {

    const {setToken} = useContext(CarritoContext);
    const token_local = localStorage.getItem("vs_token");

    useEffect(() => {
        if(token_local){
            setToken(token_local);
        }else{
            setToken('');
        }
      }, [token_local,setToken]);

  return (
    <div className='Acerca'>
        <div className='acerca_cont'>
            <h1 className='acerca_h1_color' id="nosotros">NOSOTROS</h1>
            <h2>Sobre Nosotros</h2>
            <p><strong>Virtual Store</strong> es una empresa dedicada a la venta de hardware.</p>
            <p>Nuestro principal capital invertido fue <strong>esfuerzo</strong>, trabajo y las ganas de superarnos día a día con la esperanza de crear una estructura sólida que nos permitiera hacer frente a los distintos desafíos que se nos podían presentar a lo largo del tiempo.</p>
            <p>Apoyados en alianzas estratégicas con las principales marcas <strong>tecnológicas</strong> nos fuimos volviendo referentes del mercado, ampliando nuestra oferta a mas de 24 productos de última generación, los cuales mantenemos y renovamos día a día con el objetivo de trasladar a nuestros clientes la excelencia, calidad,innovación y vanguardia que nos exigimos en cada paso que damos.</p>
            <p>Nuestra mision, es ser la empresa líder y de referencia, a <strong>nivel nacional</strong>, en la comercialización y distribución de equipos tecnológicos.</p>
            <p>Somos lo que querés, cuando querés, donde querés.<strong>Somos Virutal Store</strong> </p>
        </div>
        <div className='acerca_bg_venta'>
            <div className='acerca_bg_cont acerca_bg_cont_ventas'>
                <h1 id="venta">VENTA</h1>
                <p>Servicio profesional y especializado para escuchar tus necesidades y recomendarte los mejores productos.</p>
                <p>Ofrecemos una amplia red de productos, con tecnología de punta para que desarrolles tus sueños.</p>
                <p>Contá con el apoyo de quienes mejor conocen el mercado nacional para llevar tu negocio más lejos.</p>
                <p>Mas de 15.000 ventas efectivas!</p>
            </div>
        </div>
        <div className='acerca_cont'>
            <h1 id="envios" className='acerca_h1_color'>ENVIOS</h1>
            <div className='acerca_icon_cont'>
                <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <h2>Servicio de Envio</h2>
            <p>Virtual Store cuenta con un servicio de envio <strong>Premium.</strong></p>
            <p>Una vez seleccionado tu producto, llega el momento de embalarlo de forma correcta y enviarlo rápido para que llegue a tus manos.</p>
            <p>Para resolverlo de forma <strong>sencilla</strong>, cualquier inquietud, contamos con devolucion inmediata.</p>
            <p>Todos tus paquetes están <strong>protegidos</strong> y, si algo les sucede en el transcurso de la entrega, contas con nuestro respaldo.</p>
            <p>El costo del envío dependerá del peso y del tamaño de cada paquete. Además, nosotros nos encargamos de conseguir los mejores costos de envíos para cada zona del país.</p>
            <p>Si tu envio supera los $50.000 el envio sera <strong>Gratuito.</strong></p>
        </div>
        <div className='acerca_bg'>
            <div className='acerca_bg_cont'>
                <h1 id="testimonial">TESTIMONIAL</h1>
                <div className='acerca_testimonial_cont'>
                    <div className='acerca_testimonial_img'><img src={test01} alt=""/></div>
                    <div className='acerca_testimonial_text_cont'>
                        <div className='acerca_testimonial_quote'>
                            <span className="material-symbols-outlined">format_quote</span>
                        </div>
                        <div className='acerca_testimonial_text'>
                            <p>Virtual Store, cuanta con el mejor precio del mercado.</p>
                            <span><b>Fulan Itodetal</b> - Diseñador</span>
                        </div>
                    </div>
                </div>
                <div className='acerca_testimonial_cont'>
                    <div className='acerca_testimonial_img'><img src={test02} alt=""/></div>
                    <div className='acerca_testimonial_text_cont'>
                        <div className='acerca_testimonial_quote'>
                            <span className="material-symbols-outlined">format_quote</span>
                        </div>
                        <div className='acerca_testimonial_text'>
                            <p>El mejor sistema de envio que pude solicitar, realmente excelente! nunca falla.</p>
                            <span><b>Sue Storm</b> - Workbench Manager</span>
                        </div>
                    </div>
                </div>
                <div className='acerca_testimonial_cont'>
                    <div className='acerca_testimonial_img'><img src={test03} alt=""/></div>
                    <div className='acerca_testimonial_text_cont'>
                        <div className='acerca_testimonial_quote'>
                            <span className="material-symbols-outlined">format_quote</span>
                        </div>
                        <div className='acerca_testimonial_text'>
                            <p>Recomiendo el servicio de Virtual Store a todos mis amigos.</p>
                            <span><b>Elim Portante</b> - Backend Enginer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Acerca