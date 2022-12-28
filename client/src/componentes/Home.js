import React, { useContext, useEffect, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Link, Navigate } from "react-router-dom";
import "./Home.css";
import Loader from "./Loader";
//import profileImg from "../images/avatar.png";



function Home() {
  /* ------------- context ------------ */
  const { FETCHURL, usuario,carritoCant,setToken} = useContext(CarritoContext);

  const [compras, setCompras] = useState(null);
  const [favoritos, setFavoritos] = useState(null);
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
    const requestOptions = {
      method: "GET",
      headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+ token_local},
      credentials: 'include'
    };
    fetch(`${FETCHURL}/api/carrito/terminar/${usuario['_id']}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setCompras(data.carrito.length);
      });

    fetch(`${FETCHURL}/favorito/${usuario['_id']}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setFavoritos(data.productos?.length || 0);
      });
    }

    setLoader(false);

  }, [FETCHURL,usuario,token_local]);



  // si NO hay usuario, al login
  if(!token_local){
    if (!usuario['_id']) {
      return <Navigate to="/Login" />;
    }
  }


  return (
    <div className="Home">
      <div className="Home_cont">
        {loader ? <Loader/> : (<>
        <div className="home_profile_img">
          <img className="home_profile_pic" src={"uploads/"+usuario.avatar} alt='profile'></img>
        </div>

        <div className="home_profile_data">
          <div className="home_profile_row1">
            <h3>{usuario.username}</h3>
            <p>Usuario autorizado para Compras</p>
          </div>
          <div className="home_profile_row2">
            <Link to={"/Carrito"}>
            <div className="home_profile_box">
              <h4>Carrito</h4>
              <div className="home_profile_box_icon">
                <span className="material-symbols-outlined">shopping_cart</span>
                <p>{carritoCant || 0}</p>
              </div>
            </div>
            </Link>
            <Link to={"/Compras"}>
            <div className="home_profile_box">
              <h4>Compras</h4>
              <div className="home_profile_box_icon">
                <span className="material-symbols-outlined">shopping_bag</span>
                <p>{compras || 0}</p>
              </div>
            </div>
            </Link>
            <Link to={"/Favorito"}>
            <div className="home_profile_box">
              <h4>Favoritos</h4>
              <div className="home_profile_box_icon">
                <span className="material-symbols-outlined">favorite</span>
                <p>{favoritos || 0}</p>
              </div>
            </div>
            </Link>
          </div>

          <div className="home_profile_row3">
              <div className="home_profile_grid">
                <div className="home_profile_datos">
                  <span className="material-symbols-outlined">description</span>
                  <p>{usuario.nombre}</p>
                </div>
                <div className="home_profile_datos">
                  <span className="material-symbols-outlined">pin_drop</span>
                  <p>{usuario.direccion}</p>
                </div>
                <div className="home_profile_datos">
                  <span className="material-symbols-outlined">timer</span>
                  <p>{usuario.edad} años</p>
                </div>
                <div className="home_profile_datos">
                  <span className="material-symbols-outlined">phone_android</span>
                  <p>{usuario.telefono}</p>
                </div>
                </div>
          </div>

        </div></>)
      }
      </div>
    </div>
  );
}

export default Home;
