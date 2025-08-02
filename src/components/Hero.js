import React from 'react';
import './Hero.css';

function Hero({ setVista, setEsVisitante, setMostrarLogin,setMostrarRegistro }) {
  return (
    <div className="hero">
      <div className="hero-container">
        {/* Sección principal */}
        <div className="hero-main">
          <div className="hero-content">
            <h1>📚 Descubre tu próxima lectura favorita</h1>
            <p className="hero-subtitle">
              Únete a nuestra comunidad de lectores apasionados y explora un mundo infinito de historias, 
              conocimiento y aventuras esperando por ti.
            </p>
            <div className="hero-buttons">
              <button 
                onClick={() => {
                  setEsVisitante(true);
                  setVista('libros');
                }} 
                className="btn-primary">
                🔍 Explorar como visitante
              </button>
              <button 
                onClick={() => setMostrarLogin(true)}
                className="btn-secondary">
                🚀 Iniciar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Características principales */}
        <div className="hero-features">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3>Biblioteca Extensa</h3>
              <p>Miles de libros de todos los géneros y autores esperándote</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Reseñas Reales</h3>
              <p>Calificaciones y opiniones auténticas de otros lectores</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Comunidad Activa</h3>
              <p>Conecta con lectores que comparten tus gustos literarios</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Recomendaciones Personalizadas</h3>
              <p>Descubre libros perfectos para ti basados en tus preferencias</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="hero-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1,000+</span>
              <span className="stat-label">Libros disponibles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Lectores activos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Reseñas publicadas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Satisfacción</span>
            </div>
          </div>
        </div>

        {/* Call to action final */}
        <div className="hero-cta">
          <h2>¿Listo para comenzar tu aventura literaria?</h2>
          <p>Únete hoy y descubre por qué miles de lectores ya confían en nosotros</p>
          <div className="cta-buttons">
            <button 
              onClick={() => setMostrarRegistro(true)}
              className="btn-cta-primary">
              Crear cuenta gratis
            </button>
            <button 
              onClick={() => {
                setEsVisitante(true);
                setVista('libros');
              }}
              className="btn-cta-secondary">
              Ver libros ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;