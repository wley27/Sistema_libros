import React from 'react';
import LibroCard from './LibroCard';
import './LibroList.css';

// LibroList.js
export default function LibroList({ 
  libros, 
  onAgregarReseña, 
  onEliminarLibro, 
  rolUsuario, 
  esVisitante 
}) {
  return (
    <div className="libro-list">
      {libros.map((libro) => (
        <LibroCard
          key={libro.id}
          libro={libro}
          onAgregarReseña={onAgregarReseña}
          onEliminarLibro={onEliminarLibro}
          rolUsuario={rolUsuario}
          esVisitante={esVisitante}
        />
      ))}
    </div>
  );
}