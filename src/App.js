import React, { useState, useEffect } from 'react';
import LibroList from './components/LibroList';
import LibroForm from './components/LibroForm';
import Hero from './components/Hero';
import Login from './components/Login';
import Register from './components/Register'; // Nuevo componente
import FiltroBusqueda from './components/FiltroBusqueda';
import Header from './components/Header';
import librosDemo from './data/LibrosDemo'; // libros precargados
import SobreNosotros from './components/SobreNosotros';
import './App.css';

// Usuarios demo iniciales (se migrarán al localStorage)
const usuariosDemo = [
  { id: 1, usuario: 'admin', clave: '1234', rol: 'admin', nombre: 'Administrador', email: 'admin@biblioteca.com' },
  { id: 2, usuario: 'lector', clave: 'libros', rol: 'usuario', nombre: 'Usuario Lector', email: 'lector@email.com' },
  { id: 3, usuario: 'usuario1', clave: '123', rol: 'usuario', nombre: 'Juan Pérez', email: 'juan@email.com' },
  { id: 4, usuario: 'usuario2', clave: 'abc', rol: 'usuario', nombre: 'María García', email: 'maria@email.com' }
];

function App() {
  const [libros, setLibros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [vista, setVista] = useState('libros');
  const [usuario, setUsuario] = useState(null);
  const [rolUsuario, setRolUsuario] = useState('');
  const [esVisitante, setEsVisitante] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false); // Nuevo estado

  // Inicializar usuarios demo en localStorage si no existen
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (!usuariosGuardados) {
      localStorage.setItem('usuarios', JSON.stringify(usuariosDemo));
    }
  }, []);

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
    if (libros.length > 0) {
      localStorage.setItem('libros', JSON.stringify(libros));
    }
  }, [libros]);

  // Redirigir a la vista principal si inicia sesión
  useEffect(() => {
    if (usuario) {
      setVista('libros');
      setEsVisitante(false);
      setMostrarLogin(false);
      setMostrarRegistro(false);
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

  // Función mejorada para manejar el login
  const manejarLogin = (nombreUsuario, rol) => {
    setUsuario(nombreUsuario);
    setRolUsuario(rol);
    
    // Actualizar última conexión en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuariosActualizados = usuarios.map(u => 
      u.usuario === nombreUsuario 
        ? { ...u, ultimaConexion: new Date().toISOString() }
        : u
    );
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
    setRolUsuario('');
    setEsVisitante(false);
    setVista('libros');
  };

  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  // 🔒 Mostrar Registro si está activo
  if (mostrarRegistro) {
    return (
      <Register 
        setMostrarRegistro={setMostrarRegistro}
        setMostrarLogin={setMostrarLogin}
      />
    );
  }

  // 🔒 Mostrar Login si está activo
  if (mostrarLogin) {
    return (
      <Login 
        onLogin={manejarLogin}
        setMostrarLogin={setMostrarLogin}
        setEsVisitante={setEsVisitante}
        setVista={setVista}
        setMostrarRegistro={setMostrarRegistro}
      />
    );
  }

  // 🔒 Mostrar Hero si no hay sesión ni visita
  if (!usuario && !esVisitante) {
    return (
      <Hero 
        setVista={setVista} 
        setEsVisitante={setEsVisitante} 
        setMostrarLogin={setMostrarLogin}
        setMostrarRegistro={setMostrarRegistro} // Pasar la función
      />
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
        cerrarSesion={cerrarSesion} // Función de cierre de sesión mejorada
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
                {esVisitante && (
                  <span className="visitante-info">
                    - 👁️ Modo Visitante
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
            <h2 className="text-xl font-bold mb-4">⭐ Libros Recomendados</h2>
            <div className="recomendados-container">
              <p className="mb-4">Descubre los libros más valorados por nuestra comunidad:</p>
              {libros
                .filter(libro => libro.reseñas && libro.reseñas.length > 0)
                .sort((a, b) => (b.reseñas?.length || 0) - (a.reseñas?.length || 0))
                .slice(0, 5)
                .map(libro => (
                  <div key={libro.id} className="libro-recomendado mb-3 p-3 border rounded">
                    <h3 className="font-bold">{libro.titulo}</h3>
                    <p className="text-sm text-gray-600">Por {libro.autor}</p>
                    <p className="text-sm">📝 {libro.reseñas?.length || 0} reseñas</p>
                  </div>
                ))
              }
              {libros.filter(libro => libro.reseñas && libro.reseñas.length > 0).length === 0 && (
                <p className="text-gray-500">Aún no hay libros con reseñas. ¡Sé el primero en agregar una!</p>
              )}
            </div>
          </>
        )}

        {vista === 'sobre' && <SobreNosotros />}

        {/* Vista de perfil de usuario (nueva funcionalidad) */}
        {vista === 'perfil' && usuario && (
          <div className="perfil-container">
            <h2 className="text-xl font-bold mb-4">👤 Mi Perfil</h2>
            <div className="perfil-info p-4 border rounded">
              <p><strong>Usuario:</strong> {usuario}</p>
              <p><strong>Rol:</strong> {rolUsuario === 'admin' ? '👑 Administrador' : '👤 Usuario'}</p>
              <p><strong>Reseñas escritas:</strong> {
                libros.reduce((total, libro) => {
                  if (!libro.reseñas) return total;
                  return total + libro.reseñas.filter(resena => resena.usuario === usuario).length;
                }, 0)
              }</p>
              <button 
                onClick={cerrarSesion}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;