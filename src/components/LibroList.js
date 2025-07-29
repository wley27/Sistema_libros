import React from 'react';
import LibroCard from './LibroCard';
import './LibroList.css';

// LibroList.js
export default function LibroList({ libros, onAgregarReseña, onEliminar }) {
  return (
    <div className="libro-list">
      {libros.map((libro) => (
        <LibroCard
          key={libro.id}
          libro={libro}
          onAgregarReseña={onAgregarReseña}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}
