import React, { useState } from 'react';
import './LibroForm.css';

export default function LibroForm({ onAgregar }) {
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    descripcion: '',
    año: '',
    imagen: '',
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setLibro((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!libro.titulo.trim() || !libro.autor.trim()) {
      alert('Por favor, ingresa al menos título y autor.');
      return;
    }

    onAgregar({
      id: Date.now(),
      titulo: libro.titulo,
      autor: libro.autor,
      imagen: libro.imagen,
      año: libro.año, 
      genero: libro.genero, 
      descripcion: libro.descripcion, 
    });

    setLibro({
      titulo: '',
      autor: '',
      genero: '',
      descripcion: '',
      año: '',
      imagen: '',
    });
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Agregar Libro</h2>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={libro.titulo}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={libro.autor}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={libro.genero}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={libro.descripcion}
        onChange={manejarCambio}
      />
      <input
        type="number"
        name="año"
        placeholder="Año"
        value={libro.año}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="imagen"
        value={libro.imagen}
        onChange={manejarCambio}
        placeholder="URL de la imagen"
      />
      <button type="submit">Agregar Libro</button>
    </form>
  );
}
