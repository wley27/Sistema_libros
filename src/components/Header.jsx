// Header.js
import React from 'react';
import './Header.css'; 

function Header({ setVista }) {
  return (
    <header className="header">
      <h1 className="titulo">📚 Recomendación de Libros</h1>
      <nav className="menu">
        <button onClick={() => setVista('libros')}>Libros</button>
        <button onClick={() => setVista('agregar')}>Añadir Libro</button>
        <button onClick={() => setVista('recomendados')}>Recomendados</button>
        <button onClick={() => setVista('sobre')}>Sobre</button>
      </nav>
    </header>
  );
}


export default Header;
