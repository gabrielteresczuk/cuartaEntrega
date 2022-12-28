import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import Loader from "./Loader";

let initailForm = {
  id: null,
  username: "",
  password: "",
};



function Login() {

  /* ------------- context ------------ */

  const { FETCHURL, usuario,setToken,setUsuario,token } = useContext(CarritoContext);

  /* ------------- states ------------- */

  const [form, setForm] = useState(initailForm);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const token_local = localStorage.getItem("vs_token");

  /* ------------- metodos ------------ */

  useEffect(() => {
    if (token_local){
      const requestOptions = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token_local,
        },
        credentials: 'include'
      };
      fetch(`${FETCHURL}/signin`,requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
      });
    }else{
      setUsuario({});
      setToken('');
      localStorage.clear();
    }
    
  }, [FETCHURL,token_local,setUsuario,setToken]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //al enviar el form
  const handleSubmit = (e) => {
    e.preventDefault();
    createData(form);
  };

  //envia el registro POST, importante CREDENTIALS
  const createData = () => {
    setLoader(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    };
    fetch(`${FETCHURL}/signin`, requestOptions)
      .then((response) => {
        // si es 401 es por que no esta autorizado
        if (response.status !== 200) {
          setLoader(false);
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // carga el usuario logeado
        localStorage.setItem("vs_token", data.token);
        setToken(data.token);
        
        setUsuario(data);
      })
      .catch((error) => {
        // muestra el error en el FORM
        setError(true);
      });
  };

  const handleError = () => {
    setError(false);
  };

  // si HAY usuario, redirect a HOME
  if(token){  

    if (usuario?.username) {
      
      return <Navigate to="/Home" />;
    }
  }



  return (
    <div className="Login">
     
      <div className="login_cont">
        
        <div className="login_titulo">
          <h1>LOGIN</h1>
          <span className="material-symbols-outlined login_icon_size">key</span>
        </div>

        <p className="login_texto_ayuda">ingrese sus datos</p>
        {loader? (<><Loader/><p className="login_validando">validando...</p></>) :( 
        <form
          method="post"
          action="/signin"
          id="login_form"
          className="login_form"
          autoComplete="off"
          onSubmit={handleSubmit}
          onClick={handleError}
        >
          <label htmlFor="username">Usuario:</label>
          <input
            type="email"
            name="username"
            id="username"
            required
            className="login_form_input"
            onChange={handleChange}
            onClick={handleError}
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="login_form_input"
            onChange={handleChange}
          />
          {error && <div className="lg_msg">Datos incorrectos</div>}
          <input type="submit" value="Ingresar" className="login_btn" />

          <div className="login_reg_cont">
            <Link to={"/Register"}>Registrar</Link>
          </div>
        </form>
        )}
      </div>

    </div>
  );
}

export default Login;
