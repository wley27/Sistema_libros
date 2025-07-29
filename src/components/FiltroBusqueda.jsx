import React from 'react';
import './FiltroBusqueda.css';

function FiltroBusqueda({ filtro, setFiltro }) {
  return (
    <div className="filtro-busqueda">
      <input
        type="text"
        placeholder="Buscar por título, autor o género..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
    </div>
  );
}

export default FiltroBusqueda;
