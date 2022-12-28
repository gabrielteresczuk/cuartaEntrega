import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Inicio.css'

import image01 from "../images/01.jpg";
import image02 from "../images/02.jpg";
import image03 from "../images/03.jpg";
import cpu from "../images/promocion__cpu.png";
import gpu from "../images/promocion__gpu.png";
import mem from "../images/promocion__mem.png";
import hdd from "../images/promocion__hdd.png";
import { CarritoContext } from '../context/CarritoContext';


function Inicio() {

    const { setToken} = useContext(CarritoContext);
    const token_local = localStorage.getItem("vs_token");
    
    useEffect(() => {
        if(token_local){
          setToken(token_local);
        }else{
            setToken('');
        }
      }, [token_local,setToken]);

  return (
    <>
    <section className="hero">
        <h3>Familia Geforce RTX</h3>
        <h1>3090 TI</h1>
        <Link to={"/Producto/638f87802f71ca48475e0161"}><button>COMPRAR</button></Link> 
    </section>

    <section className="promociones__cont">
        <div className="promociones">
        
            <div className="fila1">
                <div className="promocion__dia">
                    <div className="promocion__dia_tit">
                        <h3>PROMOCION <span> DEL DIA </span></h3>
                    </div>
                    <div className="promocion__dia__cont">
                        <p>Aprovecha nuestros mejores productos, al mejor precio</p>
                        <div className="promocion__dia__img">
                            <Link to={"/Productos/gpu"}>
                            <div className="promocion__dia__gpu">
                                <img src={gpu} alt=""/>
                            </div>
                            </Link>
                            <Link to={"/Productos/cpu"}>
                            <div className="promocion__dia__cpu">
                                <img src={cpu} alt=""/>
                            </div>
                            </Link>
                            <Link to={"/Productos/mem"}>
                            <div className="promocion__dia__hdd">
                                <img src={hdd} alt=""/>
                            </div>
                            </Link>
                            <Link to={"/Productos/hdd"}>
                            <div className="promocion__dia__mem">
                                <img src={mem} alt=""/>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="promocion__item">
                    <div className="promocion__item__imagen">
                        <ul>
                            <li><p>12 GB</p> VRAM</li>
                            <li><p>1800 MHz</p> CLOCK</li>
                            <li><p>384 bit</p> GDDR6</li>
                            <li><p>350 W</p> POWER</li>
                        </ul>
                        
                        <div className="promocion__item__img">
                        <Link to={'/Producto/63a1b53e5affd9ef553e0c4a'}>
                            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_949758-MLA48688406148_122021-F.webp" alt=""/>
                            </Link>
                        </div>
                        
                        
                    </div>
                    <div className="promocion__item__data">
                        <div className="promocion__item__data_text">
                            <h4>Evga Rtx 3080ti</h4>
                            <b>$495.000</b>
                            <p>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                            </p>
                        </div>
                        <div className="promocion__item__data__control">
                            <button><span className="material-symbols-outlined">navigate_before</span></button>
                            <button><span className="material-symbols-outlined">navigate_next</span></button>
                        </div>
                    </div>
                </div>
                <div className="promocion__popular">
                    <h3>PRODUCTO <span>POPULAR</span> </h3>
                    <div className="promocion__cont">
                    <div className="promocion__popular__prod">
                        <div className="promocion__popular__prod__img">
                            <Link to={'/Producto/63a1b5cb5affd9ef553e0c57'}>
                            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_947211-MLA52630571541_112022-F.webp" alt=""/>
                            </Link>
                        </div>
                        <div className="promocion__popular__prod__data">
                            <h4>PALIT 3060 TI</h4>
                            <p>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_empty">star</span>
                                <span className="material-symbols-outlined star_empty">star</span>
                            </p>
                            <b>$178.168</b>
                        </div>
                    </div>
                    <div className="promocion__popular__prod">
                        <div className="promocion__popular__prod__img">
                        <Link to={'/Producto/63a1b62a5affd9ef553e0c59'}>
                            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_689046-MLA52684067659_122022-F.webp" alt=""/>
                            </Link>
                        </div>
                        <div className="promocion__popular__prod__data">
                            <h4>MSI RTX 3070</h4>
                            <p>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_empty">star</span>
                            </p>
                            <b>$161.999</b>
                        </div>
                    </div>
                    <div className="promocion__popular__prod">
                        <div className="promocion__popular__prod__img">
                            <Link to={'/Producto/63a1b6945affd9ef553e0c5b'}>
                            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_882956-MLA49645799857_042022-F.webp" alt=""/>
                            </Link>    
                        </div>
                        <div className="promocion__popular__prod__data">
                            <h4>PALIT GAMEROCK 3080 12GB</h4>
                            <p>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                                <span className="material-symbols-outlined star_full">star</span>
                            </p>
                            <b>$399.999</b>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
            <div className="fila2">
                <div className="gamas_cont">
                    <div>
                    <Link to={"/Productos/gpu?gamma=baja"}>     <img src={image01} alt=""/></Link>
                    </div>
                    <div>
                    <Link to={"/Productos/gpu?gamma=media"}>   <img src={image02} alt=""/></Link>
                    </div>
                    <div>
                    <Link to={"/Productos/gpu?gamma=alta"}>    <img src={image03} alt=""/></Link>
                    </div>
                </div>

            </div>
        </div>
    </section>



    </>
  )
}

export default Inicio