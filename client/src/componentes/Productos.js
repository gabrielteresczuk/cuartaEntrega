import React, {  useContext, useEffect, useState } from "react";
import Card from "./Card";
import "./Productos.css";
import { Link, NavLink, useLocation, useParams, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { CarritoContext } from "../context/CarritoContext";

function Productos() {

/* ------------- context ------------ */

  const {FETCHURL,usuario, admin,setToken} = useContext(CarritoContext);
  const { categoria } = useParams();

  const [searchParams] = useSearchParams();
  const  search  = searchParams.get('search'); 
  //const  gam  = searchParams.get('gamma'); 

/* ------------- states ------------- */

  const [productosDB, setProductosDB] = useState(null);
  const [productosOrignal, setProductosOriginal] = useState(null);
  const [orden, setOrden] = useState(0);
  const [gamma, setGamma] = useState(searchParams.get('gamma') || null);
  const [favoritos, setFavoritos] = useState(null);
  const [loader, setLoader] = useState(true);
  const { pathname } = useLocation();
  
  const token_local = localStorage.getItem("vs_token");



/* ------------- effect ------------- */


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);


  /* -------- comprobar session ------- */

  useEffect(() => {

    if(token_local){
      setToken(token_local);
    }else{
        setToken('');
    }
  }, [token_local,setToken]);
  

  /* -------------- orden ------------- */
  useEffect(() => {
    
    if(productosDB){
      let datosOrdenados =  [...productosDB];
      if(orden === '1'){
        datosOrdenados.sort(function(a, b) {
          return b.precio - a.precio; });
      }else if(orden === '-1'){
        datosOrdenados.sort(function(a, b) {
          return a.precio - b.precio;});
      }else if(orden === '0'){
        datosOrdenados.sort(function(a, b) {
          return a.timestamp - b.timestamp;});
      }
      setProductosDB(datosOrdenados);
    }
  }, [orden])

  /* ------------ categoria ----------- */
  useEffect(() => {

    setOrden(0);
    setLoader(true);
    if(categoria){
    fetch(`${FETCHURL}/api/productos/categoria/${categoria}`)
      .then((res) => res.json())
      .then((data) => {
        setProductosOriginal(data);
        if(gamma){
          data = data.filter(el => el.subcategoria === gamma);
        }
        setProductosDB(data);
        setLoader(false);
      });
    }else{
      fetch(`${FETCHURL}/api/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProductosOriginal(data);
        setProductosDB(data);
        setLoader(false);
      });
    }
  }, [FETCHURL,categoria])

  useEffect(() => {

    if(search){

    fetch(`${FETCHURL}/api/productos/busqueda/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProductosOriginal(data);
        setProductosDB(data);

      });
    }
  }, [FETCHURL,search]);

  /* -------------- gamma ------------- */

  useEffect(() => {

    if(productosDB){

      let datosFiltrados =  [...productosOrignal];
      if(gamma){
        datosFiltrados = datosFiltrados.filter(el => el.subcategoria === gamma);
      }
      setProductosDB(datosFiltrados);

    }
  }, [gamma]);



  useEffect(() => {
    
    if(usuario['_id']){
      fetch(`${FETCHURL}/favorito/${usuario['_id']}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.productos?.length){
          setFavoritos(data.productos);
        }else{
          setFavoritos([]);
        }
      });
    }

  }, [FETCHURL,productosDB,usuario]);
  
  
  

  /* ------------- methods ------------ */

  // borra 1 producto
  const handleDelete = (id) => {

    let confirmar = window.confirm(`Desea borrar el articulo ${id} ?`);

    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({administrador:admin})
      };
      fetch(`${FETCHURL}/api/productos/` + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error){
            console.log(data);
          }else{
            cargarDatos();
          }
        });
    }
  };

  // recarga el state ProductosDB
  const cargarDatos = () => {
    fetch(`${FETCHURL}/api/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProductosOriginal(data);
        setProductosDB(data);
      });
  };

  const handleOrden = (event) => {
    setOrden(event.target.value);
  }

  const handleGamma = (valor) =>{
    setGamma(valor);
  }

  const handleFavorite = (id) =>{

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id_usuario:usuario['_id'],id_producto:id}),
      credentials: "include",
    };
    fetch(`${FETCHURL}/favorito`, requestOptions)
      .then((response) => response.json())
      .then((data) => {

        setFavoritos(data.productos);
      });

  }



  /* ------------- return ------------- */

  return (
    <div className="Productos">
      <div className="Productos_cont">
      <div className="Productos_titulo">
        <h1>PRODUCTOS</h1>
        {admin && (
            <div className="Productos_admin">
              <NavLink className="Productos__btn" to={"/Productos/form"}>
                Cargar un Producto +
              </NavLink>
            </div>
          )}
      </div>
      {!productosDB ? (
        <Loader />
      ) : (
        <>

          <div className='productos_orden_cont'>
            <div className='productos_orden'>
              <span>{productosDB.length} Resultados</span>
              <select className='articulo-lista__cont-select' onChange={handleOrden} value={orden}>
                  <option value="0">Mas Relevante</option>
                  <option value="-1">Menor Precio</option>
                  <option value="1">Mayor Precio</option>
              </select>
            </div>
          </div>

          <div className="filtros_cards">
            
            <div className="Filtros__container">
              <div className="Filtros">
                <h3>FILTROS</h3>
                <div className="filtros_aplicados">
                  {categoria && <div><Link to={"/Productos/"} ><p>{categoria}</p><p>x</p></Link></div>}
                  {gamma && <div className="filtro_gamma" onClick={()=>handleGamma(null)}><p>{gamma}</p><p>x</p></div>}
                </div>
                
                <b>Categorias</b>
                <ul>
                  <li> <Link to={"/Productos/gpu"} >Graficas </Link></li>
                  <li> <Link to={"/Productos/cpu"} >Procesadores</Link></li>
                  <li> <Link to={"/Productos/mem"} >Memorias</Link></li>
                  <li> <Link to={"/Productos/hdd"} >Almacenamiento</Link></li>
                </ul>
                <b>Gamma</b>
                <ul>
                  <li onClick={()=>handleGamma('baja')}>Baja</li>
                  <li onClick={()=>handleGamma('media')}>Media</li>
                  <li onClick={()=>handleGamma('alta')}>Alta</li>
                </ul>

              </div>

            </div>

          

            <div className="Cards__container">
              {
                loader ? <Loader/> :
                productosDB.map((producto) => (
                <Card
                  admin={admin}
                  key={producto.id}
                  producto={producto}
                  handleDelete={handleDelete}
                  favoritos={favoritos}
                  handleFavorite={handleFavorite}
                />
              ))
              }
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default Productos;
