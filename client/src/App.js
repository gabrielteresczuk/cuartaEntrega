import './App.css';
import Header from './componentes/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Productos from './componentes/Productos';
import Form from './componentes/Form';
import Producto from './componentes/Producto';
import Carrito from './componentes/Carrito';
import CarritoContextContenedor from './context/CarritoContext';
import Login from './componentes/Login';
import Register from './componentes/Register';
import Home from './componentes/Home';
import Error404 from './componentes/Error404';
import Inicio from './componentes/Inicio';
import Footer from './componentes/Footer';
import Contacto from './componentes/Contacto';
import Compras from './componentes/Compras';
import Favorito from './componentes/Favorito';
import Acerca from './componentes/Acerca';

function App() {

  return (
    <div className="App" >
      <div className='App__container'>
      <BrowserRouter >
      <CarritoContextContenedor>
        <Header />
        <Routes>
          <Route path="/Inicio" element={<Inicio/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Producto/:id" element={<Producto/>}/>
          <Route path="/" element={<Productos />}/>
          <Route path="/Productos/:categoria" element={<Productos />}/>
          <Route path="/Productos" element={<Productos />}/>
          <Route path="/Carrito" element={<Carrito/>}/>
          <Route path="/Productos/form/:id" element={<Form/>  }/>
          <Route path="/Productos/form/" element={<Form/> }/>
          <Route path="/Contacto" element={<Contacto/> }/>
          <Route path="/Acerca" element={<Acerca/> }/>
          <Route path="/Compras" element={<Compras/> }/>
          <Route path="/Favorito" element={<Favorito/> }/>
          <Route path="*" element={<Error404/> }/>
        </Routes>
        <Footer/>
        </CarritoContextContenedor>
      </BrowserRouter>
      </div>
      
    </div>
  );
}

export default App;
