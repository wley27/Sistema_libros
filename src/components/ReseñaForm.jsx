import React, { useState } from 'react';

export default function ReseñaForm({ onAgregar }) {
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!comentario.trim()) return;

    onAgregar({ calificacion, comentario });
    setCalificacion(5);
    setComentario('');
  };

  return (
    <form onSubmit={manejarEnvio} style={{ marginTop: '10px' }}>
      <label>Calificación: </label>
      <select
        value={calificacion}
        onChange={(e) => setCalificacion(Number(e.target.value))}>
        {[5, 4, 3, 2, 1].map((val) => (
          <option key={val} value={val}>{val} ⭐</option>
        ))}
      </select>
      <br />
      <textarea
        placeholder="Escribe tu comentario..."
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        required
        rows={3}
        style={{ width: '100%', marginTop: '5px' }}/>
      <button type="submit" style={{ marginTop: '5px' }}>Agregar reseña</button>
    </form>
  );
}
