import React, { useState } from 'react';
import ReseñaForm from './ReseñaForm';
import './LibroCard.css';

export default function LibroCard({ libro, onAgregarReseña }) {
  const [mostrarReseñas, setMostrarReseñas] = useState(false);
  const rol = localStorage.getItem("rol");

  const toggleReseñas = () => {
    setMostrarReseñas(!mostrarReseñas);
  };

    const eliminarLibro = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este libro?");
    if (!confirmar) return;

    const libros = JSON.parse(localStorage.getItem("libros")) || [];
    const nuevosLibros = libros.filter((libro) => libro.id !== id);
    localStorage.setItem("libros", JSON.stringify(nuevosLibros));
    window.location.reload(); 
  };

  return (
    <div className="libro-card">
      <div className="libro-info">
        <div className="libro-detalles">
          <h3>{libro.titulo}</h3>
          <p><strong>Autor:</strong> {libro.autor}</p>
          <p><strong>Género:</strong> {libro.genero}</p>
          <p><strong>Año:</strong> {libro.año}</p>
          <p className="libro-descripcion">{libro.descripcion}</p>
        </div>

        {libro.portada && (
          <div className="libro-imagen-container">
            <img src={libro.portada} alt={libro.titulo} className="libro-imagen" />
          </div>
        )}
      </div>

      <button className="btn-reseñas" onClick={toggleReseñas}>
        {mostrarReseñas ? 'Ocultar Reseñas' : 'Ver / Agregar Reseñas'}
      </button>

            {/* Solo mostrar botón si es admin */}
      {rol === "admin" && (
        <button
          className="btn-reseñas"
          onClick={() => eliminarLibro(libro.id)}
          style={{ backgroundColor: 'red', color: 'white', marginTop: '8px' }}
        >
          Eliminar
        </button>
      )}

      {mostrarReseñas && (
        <div className="reseñas-section">
          <h4>Reseñas:</h4>
          {libro.reseñas?.length > 0 ? (
            <ul className="lista-reseñas">
              {libro.reseñas.map((r, idx) => (
                <li key={idx}>
                  <strong>{'⭐'.repeat(r.calificacion)}</strong>: {r.comentario}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay reseñas todavía.</p>
          )}
          <ReseñaForm onAgregar={(reseña) => onAgregarReseña(libro.id, reseña)} />
        </div>
      )}
    </div>
  );
}
