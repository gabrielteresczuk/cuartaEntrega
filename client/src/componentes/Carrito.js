import React, { useContext, useEffect, useState } from "react";
import "./Carrito.css";
import CarritoFila from "./CarritoFila";
import { CarritoContext } from "../context/CarritoContext";
import Loader from "./Loader";
import { Link, Navigate } from "react-router-dom";

function Carrito() {
  /* ------------- context ------------ */
  const { FETCHURL, usuario, setCarritoCant,setToken, token } =
    useContext(CarritoContext);

  /* ------------- states ------------- */
  const [carritoDB, setCarritoDB] = useState([]);
  const [total, setTotal] = useState(0);
  const [idCarrito, setIdCarrito] = useState(null);
  const [loading, setLoading] = useState(false);
  const [final, setFinal] = useState(false);
  const token_local = localStorage.getItem("vs_token");

  /* ------------- effect ------------- */

  useEffect(() => {
    if(token_local){
      setToken(token_local);
    }else{
        setToken('');
    }
  }, [token_local,setToken]);

  //carga los datos del carrito
  useEffect(() => {
    setLoading(true);
    let id_carrito = null;
    if(usuario?.username){
        const requestOptions = {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+ token,},
          credentials: 'include'
        };
      fetch(`${FETCHURL}/api/carrito/` + usuario["_id"],requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            id_carrito = data.id_carrito;
            setIdCarrito(id_carrito);

            fetch(`${FETCHURL}/api/carrito/${id_carrito}/productos`)
              .then((response) => response.json())
              .then((data) => {
                setLoading(false);
                setCarritoDB(data);
              });
          }else{
            setLoading(false);
          }
        })

    }

  }, [FETCHURL,usuario,token ]);

  // calcula el total
  useEffect(() => {
    let newTotal = 0;
    carritoDB.forEach((el) => {
      newTotal += parseInt(el.precio * el.cantidad);
    });
    setTotal(newTotal);
  }, [carritoDB]);

  /* ------------- methods ------------ */
  //borra una fila
  const handleDeleteRow = (id,index) => {
    let confirmar = window.confirm(`Desea borrar el articulo ${id} en ${index+1} lugar ?`);
    setLoading(true);
    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token,
        },
        credentials: "include",
      };
      fetch(
        `${FETCHURL}/api/carrito/${idCarrito}/productos/${index}`,
        requestOptions
      )
      .then((response) => response.json())
        .then((data) => cargarDatos())
    }
  };

  //borra todo el carrito
  const handleDeleteCart = () => {
    
    let confirmar = window.confirm(`Desea borrar todos los articulos ?`);
    setLoading(true);
    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token,
        },
        credentials: "include",
      };
      fetch(`${FETCHURL}/api/carrito/${idCarrito}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setCarritoCant(null);
          setCarritoDB([]);
        })
    }
  };

  //carga los datos al estado
  const cargarDatos = () => {
    setLoading(true);
    fetch(`${FETCHURL}/api/carrito/${idCarrito}/productos`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCarritoDB(data);
        setCarritoCant(data.length);
      });
  };

  const handleTerminarCart = () => {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token,
    },
      credentials: "include",
      body: JSON.stringify({
        id_usuario: usuario['_id'],
        username: usuario.username,
        nombre: usuario.nombre,
        id_carrito: idCarrito,
      }),
    };
    fetch(`${FETCHURL}/api/ordenes`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCarritoDB([]);
        setCarritoCant(null);
        setFinal(true);
      })
  };

  /* ------------- return ------------- */

  // si NO hay usuario, al login
  if(!token_local){
    if (!usuario['_id']) {
      return <Navigate to="/Login" />;
    }
  }

  if (final) {
    return (
      <div className="Carrito">
      <div className="Carrito_cont">
        <h1>CARRITO</h1>
        <div className="carrito_final">
          <div className="carrito_final_cont">
            <div className="carrito_final_icono">
                    <span className="material-symbols-outlined">
                      check
                    </span>
            </div>
            <p className="final_texto_ayuda">🎉 Felicitaciones 🎉</p>
            <h3 className="final_ok">PEDIDO RECIBIDO Y REGISTRADO</h3>
            <p className="final_texto">
              📦 Su pedido ya se encuentra recibido y esta siendo procesado por
              nuestros personal.
            </p>
            <p className="final_texto">
              📞 En breve nos pondremos en contacto con usted.
            </p>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Carrito">
    <div className="Carrito_cont">
      <h1>CARRITO</h1>

      {loading ? (
        <>
          <Loader />
          <div className="No_hay">Procesando Solicitud...</div>
        </>
      ) : !carritoDB.length ? (
        <div className="Carrito_vacio_cont">
          <div className="Carrito_vacio_icono">
            <span className="material-symbols-outlined">
              production_quantity_limits
            </span>
          </div>
          <h2>Tu Carrito se encuentra vacio</h2>
          <p> Todavia no agregaste ningun item al carrito</p>
          <Link to={"/?cat=gpu"} ><li>Productos</li></Link>
        </div>
      ) : (
        <div className="Carrito__tabla">
          <table className="table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {carritoDB.map((el, index) => (
                <CarritoFila
                  key={index}
                  index={index}
                  el={el}
                  handleDeleteRow={handleDeleteRow}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}></td>
                <td>TOTAL</td>
                <td>$ {total}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className="Carrito__controls">
            <button
              onClick={() => handleDeleteCart(idCarrito)}
              className="tabla__eliminar"
            >
              Eliminar Todo
            </button>

            <button
              onClick={() => handleTerminarCart(idCarrito)}
              className="carrito__terminar"
            >
              Terminar
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Carrito;
