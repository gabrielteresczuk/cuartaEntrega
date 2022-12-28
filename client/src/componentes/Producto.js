import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { NavLink } from "react-router-dom";
import "./Producto.css";
import Loader from "./Loader";
import Estrella from "./Estrella";

function Producto() {

/* ------------- context ------------ */

  const {FETCHURL,usuario,actualizarCarritoCant,setToken } = useContext(CarritoContext);

/* ------------- states ------------- */

  const [productoById, setProductoById] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregarLoad, setAgregarLoad] = useState(false);
  const [agregado, setAgregado] = useState(false);
  const { id } = useParams();
  const token_local = localStorage.getItem("vs_token");

/* ------------- effect ------------- */

useEffect(() => {
  if(token_local){
    setToken(token_local);
  }else{
      setToken('');
  }
}, [token_local,setToken]);

  useEffect(() => {
    fetch(`${FETCHURL}/api/productos/` + id)
      .then((res) => res.json())
      .then((data) => {

        setProductoById(data);
      });
  }, [id,FETCHURL]);

  const handleCantidad = (valor) =>{
        let newCantidad = cantidad + valor;

        if (newCantidad < 1){
            newCantidad = 1;
        }else if(newCantidad > productoById.stock){
            newCantidad = productoById.stock;
        }

        setCantidad(newCantidad);
    }

/* ------------- methods ------------ */

  // agrega el producto al carrito
  const handleAgregar = async () => {
    setAgregarLoad(true);
    let id_carrito = null;
    const requestOptions = {
      method: "GET",
      headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+ token_local},
      credentials: 'include'
    };
    await fetch(`${FETCHURL}/api/carrito/` + usuario['_id'],requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (data){
        id_carrito=data.id_carrito;
      }
    })
    
    // si no existe un carrito lo crea
    if (!id_carrito) {
      const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+ token_local},
        body: JSON.stringify({id_usuario:usuario['_id']}),
        credentials: "include",
      };
      fetch(`${FETCHURL}/api/carrito`, requestOptions)
        .then((response) => response.json())
        .then((data) => {

          guardarProducto(data.id);
        });
    } else {
    // si existe el carrito, solo guarda
      guardarProducto(id_carrito);
    }
  };

  // guarda el producto en el carrito
  const guardarProducto = (id_carrito) => {
    //console.log(id_carrito);
    
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+ token_local},
      credentials: "include",
      body: JSON.stringify({ id_prod: id, cantidad:cantidad }),
    };
    fetch(`${FETCHURL}/api/carrito/${id_carrito}/productos`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAgregarLoad(false);
        setAgregado(true);
        actualizarCarritoCant(id_carrito);
      });
  };


/* ------------- return ------------- */

  if(!productoById){
    return (<div className="Producto"><Loader/></div>)
  }else{ 


  return (
    <div className="Producto">
      <div className="Producto_cont">
      
      {productoById.nombre ? (
        <>
          <h1>{productoById.nombre}</h1>

          <div className="Producto__grid">
            <div className="Producto__grid__img">
              <img src={productoById.foto} alt="producto"></img>
              <div className="Producto_extras">
                <div className="Producto_extras_box">
                  <span className="material-symbols-outlined">verified_user</span>
                  <p>10 años de garantia</p>
                </div>
                <div className="Producto_extras_box">
                  <span className="material-symbols-outlined">local_shipping</span>
                  <p>Envio Gratuito</p>
                </div>
                <div className="Producto_extras_box">
                  <span className="material-symbols-outlined">published_with_changes</span>
                  <p> Cambio en 48 hs </p>
                </div>
              </div>
              
            </div>
            <div className="Producto__grid__text">
              <p className="grid__codigo">Cod. {productoById.codigo}</p>
              <p className="grid__nombre">{productoById.nombre}</p>
              <p className="grid__descripcion">{productoById.descripcion}</p>
              <p>
                <Estrella cantidad={productoById.ranking}/>
              </p>
              <p className="grid__stock">Stock: {productoById.stock} unidades</p>
              <p className="grid__precio">
                ${parseInt(productoById.precio).toLocaleString("es")}
              </p>
              <div className="grid__controls">

                    
                { agregarLoad ? <>Procesando...</> :
                  agregado ? (
                  <>
                    <p className="Producto__ok">Producto Agregado!</p>
                    <NavLink to={"/Carrito"} className="Producto__btn">
                      Ir al Carrito
                    </NavLink>
                  </>
                ) : (
                  usuario.username ?
                  <>
                  <div className='grid__cantidad'>
                        <button onClick={()=>{handleCantidad(-1)}}>-</button>
                        <div>{cantidad}</div>
                        <button onClick={()=>{handleCantidad(1)}}>+</button>
                  </div>
                  <button className="Producto__btn" onClick={handleAgregar}>
                    Agregar al Carrito
                  </button>
                  </>
                  :
                  <div>Ingresa para realizar compras <Link to={"/Login"}>Login!</Link></div>
                )
                }
              </div>
            </div>
          </div>
        </>
      ):(
        <div className="Carrito_vacio_cont">
                  <div className="Carrito_vacio_icono">
                    <span className="material-symbols-outlined">
                      videogame_asset
                    </span>
                  </div>
                  <h2>Articulo Inexistente</h2>
                  <p> Este articulo no existe en nuestra base de datos</p>
                  <b> Por favor, utiliza nuestro listado de productos</b>
                  <Link to={"/Productos"} ><li>Productos</li></Link>
                </div>
      )}
      </div>
    </div>
  );
}

}

export default Producto;
