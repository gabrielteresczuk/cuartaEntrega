import React, { useContext, useState } from "react";
import "./Header.css";
import { Link,Navigate,NavLink,useSearchParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

function Header() {
  /* ------------- context ------------ */

  const { FETCHURL, admin, handleAdmin, usuario, CargarUsuario, carritoCant, setToken } =
    useContext(CarritoContext);

    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '')

  /* ------------- metodo ------------- */

  // al presionar logout, borra la session y luego el user
  const handleLogout = () => {
    fetch(`${FETCHURL}/logout`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        CargarUsuario({});
        setToken('');
        localStorage.setItem("vs_token", '');
        return <Navigate to="/Login" />;
      });
  };


const handleSearch = (e) =>{
  setSearch(e.target.value);
}

const handleChat = ()=>{
  console.log('chat');
  window.location.href = FETCHURL+'/chat';
}

  /* ------------- return ------------- */

  return(
        <>
        <header className="head">

          <div className="head__login">
              <ul>
                  <Link to={"/home"}><li><span className="material-symbols-outlined">person</span>Cuenta</li></Link>
                  <Link to={"/Favorito"}><li><span className="material-symbols-outlined" >favorite</span>Favoritos</li></Link>
                  {!usuario && <Link to={"/Login"}><li><span className="material-symbols-outlined">lock</span>Login</li></Link>}
                  {usuario?.username && <Link to={"/Compras"}><li><span className="material-symbols-outlined">shopping_bag</span>Compras</li></Link>}
                  {usuario?.username && <li className="head_link" onClick={handleLogout}><span className="material-symbols-outlined">logout</span>Logout</li>}
              
                  <li className="Header__admin">
                    ADMIN
                    <label className="switch">
                      <input
                        type="checkbox"
                        onChange={handleAdmin}
                        defaultChecked={admin}
                      />
                      <span className="slider round"></span>
                    </label>
                  </li>
              </ul>
              <button className="head__chat" onClick={handleChat}><span className="material-symbols-outlined">chat</span>Chat en VIVO</button>
          </div>
          <hr/>
          <div className="head__second">
            <Link to={"/inicio"}>
              <div className="logo">
                  <span className="material-symbols-outlined joystick">sports_esports</span>
                  <div className="logo__name">
                      <p>VIRTUAL</p>
                      <i>STORE</i> 
                  </div>
              </div>
              </Link>
              <form className="search__cont" action="/" method="GET">
                  <div className="search">
                      <span className="material-symbols-outlined f10">search</span>
                      <input type="text" name="search" id="buscar" className="buscar" placeholder="RTX 3060" value={search} onChange={handleSearch}/>
                  </div>
                  <input type="submit" value="Buscar" className="btn_buscar"/>
              </form>
              <Link to={"/Carrito"}>
              <div className="head__cart">
                  <span className="material-symbols-outlined">shopping_cart</span>
                  <p>CARRITO</p>
                  <span>{carritoCant ? carritoCant : 0 } items</span>
              </div>
              </Link>
          </div>



      </header>
      <nav className="navbar">
          <ul>
              <NavLink to={"/inicio"}><li><span className="material-symbols-outlined">other_houses</span> INICIO</li></NavLink>
              <NavLink to={"/Productos/gpu"} ><li>PLACAS</li></NavLink>
              <NavLink to={"/Productos/cpu"} ><li>PROCESADORES</li></NavLink>
              <NavLink to={"/Productos/mem"} ><li>MEMORIAS</li></NavLink>
              <NavLink to={"/Productos/hdd"} ><li>ALMACENAMIENTO</li></NavLink>
              <NavLink to={"/Contacto"} ><li>CONTACTO</li></NavLink>
              <NavLink to={"/Acerca"} ><li>ACERCA</li></NavLink>
          </ul>
      </nav>
    </>
  )

  }

export default Header;
