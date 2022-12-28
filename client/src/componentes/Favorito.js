import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import './Favorito.css'
import Loader from './Loader';

function Favorito() {


    const { FETCHURL, usuario,setToken } = useContext(CarritoContext);
    const [favoritos, setFavoritos] = useState([]);
    const [productos, setProductos] = useState(null);
    const [loader, setLoader] = useState(true);
    const token_local = localStorage.getItem("vs_token");

    useEffect(() => {
      if(token_local){
        setToken(token_local);
      }else{
          setToken('');
      }
    }, [token_local,setToken]);


    useEffect(() => {
      if(usuario?.username){
            fetch(`${FETCHURL}/favorito/${usuario['_id']}`)
            .then((res) => res.json())
            .then((favorito) => {
              if(favorito.productos?.length){
                setFavoritos(favorito.productos);
                fetch(`${FETCHURL}/api/productos`)
                .then((res) => res.json())
                .then((producto) => {
                    setProductos(producto);
                    setLoader(false);
                });
              }else{
                setFavoritos([]);
                setLoader(false);
              }
            });
          }
      }, [FETCHURL,usuario]);

      if(!token_local){
        if (!usuario['_id']) {
          return <Navigate to="/Login" />;
        }
      }

    return (
        <div className='Favoritos'>
            <div className='Favoritos_cont'>
                <h1>Favoritos agendados</h1>

                {
                loader ? <Loader/> 
                : 
                favoritos.length ? (
                  favoritos.map((el,i)=>{
                    let prod = productos.filter(pr=> pr['_id'] === el)
                    
                   return( 
                    <div className='Favoritos_item' key={i}>
                        <div className='Favoritos_item_foto'>
                          <img src={prod[0].foto} alt={prod[0].nombre}></img>
                        </div>
                        <div className='Favoritos_item_text'>
                            <div className='Favoritos_item_text_col1'>
                              <h3>{prod[0].nombre}</h3>
                              <div> ID: {el} </div>
                              <div> Precio: ${prod[0].precio}</div>
                            </div>
                            <div className='Favoritos_item_text_col2'>
                              <Link to={"/Producto/" + el}>
                              <span className="material-symbols-outlined">
                                forward
                              </span>
                              IR
                              </Link>
                            </div>
                        </div>
                    </div>)
                  }
                    
                )
                )
                :
                (
                  <div className="Carrito_vacio_cont">
                  <div className="Carrito_vacio_icono">
                    <span className="material-symbols-outlined">
                      favorite
                    </span>
                  </div>
                  <h2>Tu historial esta Vacio</h2>
                  <p> Todavia no registraste ningun favorito</p>
                  <Link to={"/?cat=gpu"} ><li>Productos</li></Link>
                </div>
                )
                }

            </div>
        </div>
      )
}


export default Favorito