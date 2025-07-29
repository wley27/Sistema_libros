import React, { useState, useEffect } from 'react';
import LibroList from './components/LibroList';
import LibroForm from './components/LibroForm';
import FiltroBusqueda from './components/FiltroBusqueda';
import Header from './components/Header';
import librosDemo from './data/LibrosDemo'; // libros precargados con imágenes, reseñas, etc.
import SobreNosotros from './components/SobreNosotros';
import Recomendaciones from './components/Recomendaciones';
import './App.css';

function App() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [vista, setVista] = useState('libros');

  // Al cargar la app, inicializa los libros desde localStorage o demo
useEffect(() => {
  const librosGuardados = localStorage.getItem('libros');
  if (librosGuardados) {
    const librosParseados = JSON.parse(librosGuardados);

    // Verifica si algún libro demo falta y lo añade
    const idsGuardados = librosParseados.map((libro) => libro.id);
    const librosFaltantes = librosDemo.filter((demoLibro) => !idsGuardados.includes(demoLibro.id));
    const librosCombinados = [...librosParseados, ...librosFaltantes];

    setLibros(librosCombinados);
    localStorage.setItem('libros', JSON.stringify(librosCombinados));
  } else {
    setLibros(librosDemo); // Primera vez, solo carga los demo
    localStorage.setItem('libros', JSON.stringify(librosDemo));
  }
}, []);


  // Siempre que los libros cambien, actualiza el localStorage
  useEffect(() => {
    localStorage.setItem('libros', JSON.stringify(libros));
  }, [libros]);

  const agregarLibro = (nuevoLibro) => {
    const actualizado = [...libros, nuevoLibro];
    setLibros(actualizado);
  };

  const agregarReseña = (id, nuevaReseña) => {
    const actualizados = libros.map((libro) =>
      libro.id === id
        ? { ...libro, reseñas: [...(libro.reseñas || []), nuevaReseña] }
        : libro
    );
    setLibros(actualizados);
  };

  const eliminarLibro = (id) => {
    setLibros(libros.filter((libro) => libro.id !== id));
  };


  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="App font-sans">
      <Header setVista={setVista} />

      <main className="p-4">
        {vista === 'libros' && (
          <>
            <FiltroBusqueda filtro={filtro} setFiltro={setFiltro} />
            <h2 className="text-xl font-bold mb-4">Libros disponibles</h2>
            <LibroList libros={librosFiltrados} onAgregarReseña={agregarReseña} />
          </>
        )}

        {vista === 'agregar' && (
          <>
            <h2 className="text-xl font-bold mb-4">Agregar nuevo libro</h2>
            <LibroForm onAgregar={agregarLibro} />
          </>
        )}

        {vista === 'recomendados' && (
          <>
            <h2 className="text-xl font-bold mb-4">Libros Recomendados</h2>
            <p>Aquí podrías mostrar los libros con más reseñas o calificaciones.</p>
                  <Recomendaciones libros={libros} />
                  <LibroList libros={libros} onAgregarReseña={() => {}} />

            {/* Puedes aplicar lógica para filtrar aquí */}
          </>
        )}

       {vista === 'sobre' && (
  <SobreNosotros />
)}
      </main>
    </div>
  );
}

export default App;
