import React from 'react';
import './SobreNosotros.css';

export default function SobreNosotros() {
  return (
    <div className="sobre-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Sobre Nosotros</h1>
        <p>Conectando lectores con sus próximas aventuras literarias</p>
      </section>

      {/* Content Section */}
      <div className="content-section">
        {/* Nuestra Historia */}
        <section className="section">
          <h2>Nuestra Historia</h2>
          <p>
            Somos un equipo apasionado por la literatura y la tecnología. Nuestro sistema de recomendación de libros nació de la necesidad de crear un espacio donde los amantes de la lectura puedan descubrir nuevas historias, compartir sus experiencias y conectar con otros lectores.
          </p>
          <p>
            Creemos que cada libro tiene el poder de transformar vidas, abrir mentes y crear conexiones únicas entre las personas. Por eso, hemos desarrollado esta plataforma donde la comunidad lectora puede crecer y prosperar juntos.
          </p>
        </section>

        {/* Nuestra Misión */}
        <section className="section">
          <h2>Nuestra Misión</h2>
          <p>
            Facilitar el descubrimiento de libros extraordinarios a través de recomendaciones personalizadas y reseñas auténticas de nuestra comunidad. Queremos democratizar el acceso a la literatura y crear un ecosistema donde cada lector, sin importar sus gustos o experiencia, pueda encontrar su próxima lectura favorita.
          </p>
        </section>

        {/* Estadísticas */}
        <section className="stats-section">
          <h2 style={{textAlign: 'center', color: '#005f73', marginBottom: '30px'}}>Nuestros Números</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">1,000+</span>
              <div className="stat-label">Libros en Catálogo</div>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <div className="stat-label">Usuarios Activos</div>
            </div>
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <div className="stat-label">Reseñas Publicadas</div>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </section>

    

        {/* Nuestros Valores */}
        <section className="section">
          <h2>Nuestros Valores</h2>
          <p>
            <strong>📖 Pasión por la Literatura:</strong> Creemos que los libros son ventanas a mundos infinitos y experiencias transformadoras.
          </p>
          <p>
            <strong>🤝 Comunidad:</strong> Fomentamos un ambiente inclusivo donde todos los lectores son bienvenidos, sin importar sus preferencias o nivel de experiencia.
          </p>
          <p>
            <strong>🎯 Precisión:</strong> Nos esforzamos por ofrecer recomendaciones precisas y relevantes utilizando la mejor tecnología disponible.
          </p>
          <p>
            <strong>🌱 Crecimiento:</strong> Estamos comprometidos con el crecimiento personal de nuestros usuarios a través de la lectura y el aprendizaje continuo.
          </p>
        </section>

        {/* Contacto */}
        <section className="contact-section">
          <h2>¡Conecta con Nosotros!</h2>
          <p>¿Tienes preguntas, sugerencias o simplemente quieres charlar sobre libros? ¡Nos encantaría saber de ti!</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <span>📧</span>
              <span>contacto@librosrecomendados.com</span>
            </div>
            <div className="contact-item">
              <span>📱</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span>🌍</span>
              <span>www.librosrecomendados.com</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}