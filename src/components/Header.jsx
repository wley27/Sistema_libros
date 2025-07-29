// Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css'; 

function Header({ setVista, usuario, rolUsuario, setUsuario, setRolUsuario, setEsVisitante, setMostrarLogin, vista }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cerrarSesion = () => {
    setUsuario(null);
    setRolUsuario('');
    setEsVisitante(false);
    setMostrarLogin(false);
    setMobileMenuOpen(false);
    alert('Sesión cerrada correctamente');
  };

  const irAInicio = () => {
    setUsuario(null);
    setRolUsuario('');
    setEsVisitante(false);
    setMostrarLogin(false);
    setMobileMenuOpen(false);
  };

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Cerrar menu mobile al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.header')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <h1 className="titulo" onClick={() => cambiarVista('libros')}>
          📚 Recomendacion de Libro
        </h1>
        
        {/* Desktop Navigation */}
        <nav className="menu">
          <button 
            onClick={() => cambiarVista('libros')}
            className={vista === 'libros' ? 'active' : ''}
          >
            📚 Libros
          </button>
          {/* Solo mostrar "Añadir" si es admin */}
          {rolUsuario === 'admin' && (
            <button 
              onClick={() => cambiarVista('agregar')}
              className={vista === 'agregar' ? 'active' : ''}
            >
              ➕ Añadir
            </button>
          )}
          <button 
            onClick={() => cambiarVista('recomendados')}
            className={vista === 'recomendados' ? 'active' : ''}
          >
            ⭐ Recomendados
          </button>
          <button 
            onClick={() => cambiarVista('sobre')}
            className={vista === 'sobre' ? 'active' : ''}
          >
            ℹ️ Sobre
          </button>
          {usuario ? (
            <button onClick={cerrarSesion} className="cerrar-sesion">
              🚪 Cerrar sesión
            </button>
          ) : (
            <button onClick={irAInicio} className="btn-inicio">
              🏠 Inicio
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✖️' : '☰'}
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button 
            onClick={() => cambiarVista('libros')}
            className={vista === 'libros' ? 'active' : ''}
          >
            📚 Libros
          </button>
          {/* Solo mostrar "Añadir" si es admin */}
          {rolUsuario === 'admin' && (
            <button 
              onClick={() => cambiarVista('agregar')}
              className={vista === 'agregar' ? 'active' : ''}
            >
              ➕ Añadir Libro
            </button>
          )}
          <button 
            onClick={() => cambiarVista('recomendados')}
            className={vista === 'recomendados' ? 'active' : ''}
          >
            ⭐ Recomendados
          </button>
          <button 
            onClick={() => cambiarVista('sobre')}
            className={vista === 'sobre' ? 'active' : ''}
          >
            ℹ️ Sobre Nosotros
          </button>
          {usuario ? (
            <button onClick={cerrarSesion} className="cerrar-sesion">
              🚪 Cerrar sesión
            </button>
          ) : (
            <button onClick={irAInicio} className="btn-inicio">
              🏠 Volver al Inicio
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;