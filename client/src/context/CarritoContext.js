import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const CarritoContext = createContext();



function CarritoContextContenedor({ children }) {
  /* ------ constante de conexion ----- */

  const FETCHURL = "http://localhost:8080";
  //const FETCHURL = "https://virtualstore-production.up.railway.app";

  /* -------------- state ------------- */
  //const [carritoId, setCarritoId] = useState(JSON.parse(localStorage.getItem("CarritoId")) || null);
  const [usuario, setUsuario] = useState({});
  const [carritoCant, setCarritoCant] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("vs_token") || null);


/* ------------- methods ------------ */
  useEffect(() => {
    if(token){
      // al cargar, trae los datos del usuario
      const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        credentials: 'include'
      };
      fetch(`${FETCHURL}/signin`,requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsuario(data);
      })
      .catch((error) => {
        CargarUsuario({});
        setCarritoCant(null);
        setToken('');
        localStorage.clear();
      });
    }else{
      CargarUsuario({});
      setCarritoCant(null);
      localStorage.clear();
    }
  }, [token]);

  useEffect(() => {
    if(localStorage.getItem("vs_token")){
      if(usuario){
        if(usuario['_id']){
          // si hay usuario, trae el carrito
          const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem("vs_token"),
            },
            credentials: 'include'
          };
          fetch(`${FETCHURL}/api/carrito/${usuario['_id']}`,requestOptions)
          .then((res) => {
            if (res.status !== 200) {
              throw new Error(res.status);
            } else {
              return res.json();
            }
          })
          .then((data) => {
            // si hay carrito, trae los productos
            if(data){
              fetch(`${FETCHURL}/api/carrito/${data.id_carrito}/productos`, requestOptions)
              .then((res) => res.json())
              .then((data) => {
                
                setCarritoCant(data.length);
              });
            }else{
              setCarritoCant(null);
            }
          })        
          .catch((error) => {
            CargarUsuario({});
            setToken('');
            localStorage.clear();
          });
        }
    }
}

}, [usuario]);
  
  

  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const actualizarCarritoCant = async (id_carrito) =>{

    try {
      const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        },
        credentials: 'include'
      };
      let res3 = await fetch(`${FETCHURL}/api/carrito/${id_carrito}/productos`, requestOptions);
      let data3 = await res3.json();
      
      setCarritoCant(data3.length);
      
    } catch (error) {
      console.log(error);
    }

  }


  const CargarUsuario = (data) =>{
    setUsuario(data);
  }

  const NoAutenticado = () =>{

    CargarUsuario({});
    setToken('');
    localStorage.clear();
    //return <Navigate to="/Login" />
  }


/* ------------- return ------------- */
  return (
    <CarritoContext.Provider
      value={{
        FETCHURL,
        token,
        setToken,
        admin,
        usuario,
        carritoCant,
        handleAdmin,
        CargarUsuario,
        actualizarCarritoCant,
        setCarritoCant,
        NoAutenticado,
        setUsuario
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoContextContenedor;
