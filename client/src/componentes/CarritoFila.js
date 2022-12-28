import React from "react";
import './Contacto.css'

function CarritoFila({index,el, handleDeleteRow }) {
  //retornamos una linea de tabla
  return (
    <tr className="CarritoFila">
      <td>
        <img src={el.foto} alt="foto" />
      </td>
      <td>{el.nombre}</td>
      <td>$ {el.precio}</td>
      <td>{el.cantidad}</td>
      <td>$ {el.precio * el.cantidad}</td>
      <td>
        <button
          onClick={() => {
            handleDeleteRow(el.id,index);
          }}
          className="tabla__eliminar"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default CarritoFila;
