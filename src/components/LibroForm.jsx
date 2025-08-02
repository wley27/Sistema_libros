import React, { useState } from 'react';
import './LibroForm.css';

export default function LibroForm({ onAgregar }) {
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    descripcion: '',
    año: '',
    portada: '',
  });
  
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

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
      ...libro,
    });

    // Mostrar mensaje de confirmación
    setMensajeConfirmacion(`✅ ¡El libro "${libro.titulo}" ha sido agregado exitosamente!`);

    // Limpiar el formulario
    setLibro({
      titulo: '',
      autor: '',
      genero: '',
      descripcion: '',
      año: '',
      portada: '',
    });

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeConfirmacion('');
    }, 3000);
  };

  return (
    <div>
      {mensajeConfirmacion && (
        <div className="mensaje-confirmacion">
          {mensajeConfirmacion}
        </div>
      )}
      
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
          name="portada"
          placeholder="URL de la Imagen"
          value={libro.portada}
          onChange={manejarCambio}
        />
        <button type="submit">Agregar Libro</button>
      </form>
    </div>
  );
}