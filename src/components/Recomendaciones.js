import React, { useState } from 'react';
import './Recomendaciones.css';

const Recomendaciones = ({ libros, onAgregarReseña, usuario, esVisitante }) => {
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [algoritmo, setAlgoritmo] = useState('puntuacion');

  // Función para calcular la puntuación promedio de un libro
  const calcularPuntuacionPromedio = (libro) => {
    if (!libro.reseñas || libro.reseñas.length === 0) return 0;
    const suma = libro.reseñas.reduce((acc, resena) => acc + (resena.puntuacion || 0), 0);
    return suma / libro.reseñas.length;
  };

  // Función para obtener todas las categorías únicas
  const obtenerCategorias = () => {
    const categorias = new Set();
    libros.forEach(libro => {
      if (libro.categoria) {
        categorias.add(libro.categoria);
      }
    });
    return Array.from(categorias);
  };

  // Algoritmo de recomendación por puntuación
  const recomendarPorPuntuacion = (librosBase) => {
    return librosBase
      .filter(libro => libro.reseñas && libro.reseñas.length > 0)
      .map(libro => ({
        ...libro,
        puntuacionPromedio: calcularPuntuacionPromedio(libro),
        criterio: 'Mejor puntuación'
      }))
      .sort((a, b) => b.puntuacionPromedio - a.puntuacionPromedio);
  };

  // Algoritmo de recomendación por popularidad
  const recomendarPorPopularidad = (librosBase) => {
    return librosBase
      .filter(libro => libro.reseñas && libro.reseñas.length > 0)
      .map(libro => ({
        ...libro,
        puntuacionPromedio: calcularPuntuacionPromedio(libro),
        criterio: 'Más popular'
      }))
      .sort((a, b) => b.reseñas.length - a.reseñas.length);
  };

  // Algoritmo de recomendación mixto (puntuación + popularidad)
  const recomendarMixto = (librosBase) => {
    return librosBase
      .filter(libro => libro.reseñas && libro.reseñas.length > 0)
      .map(libro => {
        const puntuacion = calcularPuntuacionPromedio(libro);
        const popularidad = libro.reseñas.length;
        // Fórmula mixta: 70% puntuación + 30% popularidad normalizada
        const puntuacionNormalizada = puntuacion / 5; // Normalizar a 0-1
        const popularidadNormalizada = Math.min(popularidad / 10, 1); // Normalizar, máximo 10 reseñas = 1
        const puntuacionMixta = (puntuacionNormalizada * 0.7) + (popularidadNormalizada * 0.3);
        
        return {
          ...libro,
          puntuacionPromedio: puntuacion,
          puntuacionMixta: puntuacionMixta * 5, // Volver a escala 0-5
          criterio: 'Recomendación inteligente'
        };
      })
      .sort((a, b) => b.puntuacionMixta - a.puntuacionMixta);
  };

  // Aplicar filtros y algoritmos
  const obtenerRecomendaciones = () => {
    let librosBase = libros;

    // Filtrar por categoría
    if (filtroCategoria !== 'todos') {
      librosBase = librosBase.filter(libro => libro.categoria === filtroCategoria);
    }

    // Aplicar algoritmo de recomendación
    let recomendaciones;
    switch (algoritmo) {
      case 'puntuacion':
        recomendaciones = recomendarPorPuntuacion(librosBase);
        break;
      case 'popularidad':
        recomendaciones = recomendarPorPopularidad(librosBase);
        break;
      case 'mixto':
        recomendaciones = recomendarMixto(librosBase);
        break;
      default:
        recomendaciones = recomendarPorPuntuacion(librosBase);
    }

    return recomendaciones.slice(0, 8); // Mostrar top 8
  };

  // Generar estrellas para mostrar puntuación
  const generarEstrellas = (puntuacion) => {
    const estrellas = [];
    const puntuacionRedondeada = Math.round(puntuacion * 2) / 2; // Redondear a 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= puntuacionRedondeada) {
        estrellas.push('⭐');
      } else if (i - 0.5 <= puntuacionRedondeada) {
        estrellas.push('⭐'); // Simplificado, en una app real usarías media estrella
      } else {
        estrellas.push('☆');
      }
    }
    return estrellas.join('');
  };

  const recomendaciones = obtenerRecomendaciones();
  const categorias = obtenerCategorias();

  return (
    <div className="recomendaciones-container">
      <div className="recomendaciones-header">
        <h2 className="text-2xl font-bold mb-6">⭐ Sistema de Recomendaciones Inteligente</h2>
        
        <div className="filtros-recomendaciones mb-6">
          <div className="filtro-grupo">
            <label htmlFor="algoritmo" className="filtro-label">🧠 Algoritmo:</label>
            <select 
              id="algoritmo"
              value={algoritmo} 
              onChange={(e) => setAlgoritmo(e.target.value)}
              className="filtro-select"
            >
              <option value="puntuacion">Mejor Puntuación</option>
              <option value="popularidad">Más Popular</option>
              <option value="mixto">Recomendación Mixta</option>
            </select>
          </div>

          <div className="filtro-grupo">
            <label htmlFor="categoria" className="filtro-label">📚 Categoría:</label>
            <select 
              id="categoria"
              value={filtroCategoria} 
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="filtro-select"
            >
              <option value="todos">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {recomendaciones.length === 0 ? (
        <div className="sin-recomendaciones">
          <div className="mensaje-vacio">
            <h3>📖 No hay recomendaciones disponibles</h3>
            <p>Aún no tenemos suficientes reseñas para generar recomendaciones. ¡Sé el primero en agregar reseñas!</p>
          </div>
        </div>
      ) : (
        <>
          <div className="estadisticas-recomendaciones mb-4">
            <p className="texto-estadisticas">
              Mostrando <strong>{recomendaciones.length}</strong> recomendaciones 
              {filtroCategoria !== 'todos' && ` en la categoría "${filtroCategoria}"`}
            </p>
          </div>

          <div className="grid-recomendaciones">
            {recomendaciones.map((libro, index) => (
              <div key={libro.id} className="tarjeta-recomendacion">
                <div className="ranking-badge">#{index + 1}</div>
                
                <div className="contenido-libro">
                  <div className="info-principal">
                    <h3 className="titulo-libro">{libro.titulo}</h3>
                    <p className="autor-libro">por {libro.autor}</p>
                    
                    {libro.categoria && (
                      <span className="categoria-badge">{libro.categoria}</span>
                    )}
                  </div>

                  <div className="puntuacion-section">
                    <div className="estrellas">
                      {generarEstrellas(libro.puntuacionPromedio)}
                    </div>
                    <span className="puntuacion-numerica">
                      {libro.puntuacionPromedio.toFixed(1)}/5
                    </span>
                  </div>

                  <div className="estadisticas-libro">
                    <div className="stat-item">
                      <span className="stat-icon">📝</span>
                      <span>{libro.reseñas.length} reseña{libro.reseñas.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="criterio-recomendacion">
                      <span className="criterio-badge">{libro.criterio}</span>
                    </div>
                  </div>

                  {libro.descripcion && (
                    <p className="descripcion-libro">{libro.descripcion}</p>
                  )}

                  <div className="reseñas-preview">
                    <h4>Últimas reseñas:</h4>
                    {libro.reseñas.slice(-2).map((resena, idx) => (
                      <div key={idx} className="resena-mini">
                        <div className="resena-header">
                          <strong>{resena.usuario}</strong>
                          <span className="puntuacion-mini">
                            {generarEstrellas(resena.puntuacion)}
                          </span>
                        </div>
                        <p className="comentario-mini">"{resena.comentario}"</p>
                      </div>
                    ))}
                  </div>

                  {!esVisitante && usuario && (
                    <div className="acciones-libro">
                      <button 
                        className="btn-agregar-resena"
                        onClick={() => {
                          const nuevaReseña = {
                            usuario: usuario,
                            comentario: prompt('Escribe tu reseña:'),
                            puntuacion: parseInt(prompt('Puntuación (1-5):')) || 5,
                            fecha: new Date().toLocaleDateString()
                          };
                          if (nuevaReseña.comentario) {
                            onAgregarReseña(libro.id, nuevaReseña);
                          }
                        }}>
                        ✍️ Agregar mi reseña
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Recomendaciones;