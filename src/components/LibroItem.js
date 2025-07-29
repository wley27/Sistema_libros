import React from 'react';

export default function LibroItem({ libro }) {
  return (
    <li
      style={{
        marginBottom: 20,
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        display: 'flex',
        gap: 10,
      }}
    >
      {libro.imagen && (
        <img
          src={libro.imagen}
          alt={libro.titulo}
          style={{ width: 100, height: 150, objectFit: 'cover' }}
        />
      )}
      <div>
        <h3>{libro.titulo}</h3>
        <p><b>Autor:</b> {libro.autor}</p>
        <p><b>Género:</b> {libro.genero}</p>
        <p><b>Año:</b> {libro.año}</p>
        <p>{libro.descripcion}</p>
      </div>
    </li>
  );
}
