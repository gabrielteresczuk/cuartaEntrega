import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import './Compras.css'
import Loader from './Loader';

function Compras() {
    const { FETCHURL, usuario,setToken } = useContext(CarritoContext);
    const [compras, setCompras] = useState(null);
    const [loader, setLoader] = useState(true);
    const [expandir, setExpandir] = useState(null);
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
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+ token_local,},
            credentials: 'include'
          };
        fetch(`${FETCHURL}/api/carrito/terminar/${usuario['_id']}`, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setCompras(data.carrito);

            setLoader(false);

          });
        }
      }, [FETCHURL,usuario,token_local]);

      const handleExpandir = (i) =>{

        if(i === expandir){
          setExpandir(null);
        }else{
          setExpandir(i);
        }
        
      }

  // si NO hay usuario, al login
  if(!token_local){
    if (!usuario['_id']) {
      return <Navigate to="/Login" />;
    }
  }

  return (
    <div className='Compras'>
        <div className='Compras_cont'>
            <h1>Compras Realizadas</h1>

            {
              loader ? <Loader/> 
                : 
                compras.length ? (
                compras.map((el,i)=>
                <div className='Compras_item_cont' key={i}>
                <div className='Compras_item' >
                  <div className='Compras_item_nro'>{i+1}</div>
                  <div className='Compras_item_text'>
                      <div className='Compras_item_col1'>
                        <h3>ID: {el['_id']}</h3>
                        <div> Productos: {el.productos.length}</div>
                        <div> Total: ${el.productos.reduce((accumulator, curValue)=>{return accumulator + (curValue.precio*curValue.cantidad)},0)}</div>
                      </div>    
                      <div className='Compras_item_col2'>
                        <p>{new Date(parseInt(el.timestamp)).toLocaleString()}</p>
                        <button className='Carrito__btn compras_btn' onClick={()=>handleExpandir(i)}>Expandir</button>
                      </div>  
                        
                  </div>

                </div>
                {expandir === i ?                 
                  <div className='Compras_productos'>
                      <table className="table table_compras">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {el.productos.map((pr,pi) =>    
                            <tr key={pi} className="CarritoFila table_compras_tr">
                            <td>
                              <img src={pr.foto} alt="foto" />
                            </td>
                            <td>{pr.nombre}</td>
                            <td>$ {pr.precio}</td>
                            <td>{pr.cantidad}</td>
                            <td>$ {pr.precio * pr.cantidad}</td>
                          </tr>)
                          }
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3}></td>
                            <td>TOTAL</td>
                            <td>$ {el.productos.reduce((accumulator, curValue)=>{return accumulator + (curValue.precio*curValue.cantidad)},0)}</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                  </div>
                  :''}
                </div>


            )
            ):(
              <div className="Carrito_vacio_cont">
              <div className="Carrito_vacio_icono">
                <span className="material-symbols-outlined">
                  sell
                </span>
              </div>
              <h2>Tu historial esta Vacio</h2>
              <p> Todavia registraste ninguna compra</p>
              <Link to={"/?cat=gpu"} ><li>Productos</li></Link>
            </div>
            )
            }



        </div>
    </div>
  )
}

export default Compras