import React, { useState, useEffect } from 'react';
import LibroList from './components/LibroList';
import LibroForm from './components/LibroForm';
import Hero from './components/Hero';
import Login from './components/Login';
import FiltroBusqueda from './components/FiltroBusqueda';
import Header from './components/Header';
import librosDemo from './data/LibrosDemo'; // libros precargados
import SobreNosotros from './components/SobreNosotros';
import './App.css';

function App() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [vista, setVista] = useState('libros');
  const [usuario, setUsuario] = useState(null);
  const [rolUsuario, setRolUsuario] = useState('');
  const [esVisitante, setEsVisitante] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  // Cargar libros desde localStorage o demo
  useEffect(() => {
    const librosGuardados = localStorage.getItem('libros');
    if (librosGuardados) {
      const librosParseados = JSON.parse(librosGuardados);
      const idsGuardados = librosParseados.map((libro) => libro.id);
      const librosFaltantes = librosDemo.filter((demoLibro) => !idsGuardados.includes(demoLibro.id));
      const librosCombinados = [...librosParseados, ...librosFaltantes];
      setLibros(librosCombinados);
      localStorage.setItem('libros', JSON.stringify(librosCombinados));
    } else {
      setLibros(librosDemo);
      localStorage.setItem('libros', JSON.stringify(librosDemo));
    }
  }, []);

  // Guardar libros en localStorage si hay cambios
  useEffect(() => {
    localStorage.setItem('libros', JSON.stringify(libros));
  }, [libros]);

  // Redirigir a la vista principal si inicia sesión
  useEffect(() => {
    if (usuario) {
      setVista('libros');
      setEsVisitante(false);
      setMostrarLogin(false);
    }
  }, [usuario]);

  const agregarLibro = (nuevoLibro) => {
    setLibros([...libros, nuevoLibro]);
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
    if (rolUsuario !== 'admin') {
      alert('Solo los administradores pueden eliminar libros');
      return;
    }
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este libro?');
    if (confirmacion) {
      const librosActualizados = libros.filter(libro => libro.id !== id);
      setLibros(librosActualizados);
      alert('Libro eliminado correctamente');
    }
  };

  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  // 🔒 Mostrar Hero o Login si no hay sesión ni visita
  if (!usuario && !esVisitante) {
    return mostrarLogin ? (
      <Login 
        onLogin={(nombreUsuario, rol) => {
          setUsuario(nombreUsuario);
          setRolUsuario(rol);
        }}
        setMostrarLogin={setMostrarLogin}
        setEsVisitante={setEsVisitante}
        setVista={setVista}
      />
    ) : (
      <Hero setVista={setVista} setEsVisitante={setEsVisitante} setMostrarLogin={setMostrarLogin} />
    );
  }

  return (
    <div className="App font-sans">
      <Header
        setVista={setVista}
        vista={vista}
        usuario={usuario}
        rolUsuario={rolUsuario}
        setUsuario={setUsuario}
        setRolUsuario={setRolUsuario}
        setEsVisitante={setEsVisitante}
        setMostrarLogin={setMostrarLogin}
      />
      <main className="p-4">
        {vista === 'libros' && (
          <>
            <FiltroBusqueda filtro={filtro} setFiltro={setFiltro} />
            <div className="vista-header">
              <h2 className="text-xl font-bold mb-4">
                📚 Libros disponibles 
                {usuario && (
                  <span className="usuario-info">
                    - {rolUsuario === 'admin' ? '👑 Admin' : '👤 Usuario'}: {usuario}
                  </span>
                )}
              </h2>
            </div>
            <LibroList 
              libros={librosFiltrados} 
              onAgregarReseña={agregarReseña}
              onEliminarLibro={eliminarLibro}
              rolUsuario={rolUsuario}
              esVisitante={esVisitante}
            />
          </>
        )}

        {vista === 'agregar' && rolUsuario === 'admin' && (
          <>
            <h2 className="text-xl font-bold mb-4">➕ Agregar nuevo libro</h2>
            <LibroForm onAgregar={agregarLibro} />
          </>
        )}

        {vista === 'agregar' && rolUsuario !== 'admin' && (
          <div className="acceso-denegado">
            <h2 className="text-xl font-bold mb-4">🚫 Acceso Denegado</h2>
            <p>Solo los administradores pueden agregar libros.</p>
            <button onClick={() => setVista('libros')} className="btn-volver">
              Volver a Libros
            </button>
          </div>
        )}

        {vista === 'recomendados' && (
          <>
            <h2 className="text-xl font-bold mb-4">Libros Recomendados</h2>
            <p>Aquí podrías mostrar los libros con más reseñas o calificaciones.</p>
          </>
        )}

        {vista === 'sobre' && <SobreNosotros />}
      </main>
    </div>
  );
}

export default App;