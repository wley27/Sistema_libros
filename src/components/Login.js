// components/Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';

// Usuarios demo iniciales (se agregarán al localStorage si no existen)
const usuariosDemo = [
  { id: 1, usuario: 'admin', clave: '1234', rol: 'admin', nombre: 'Administrador', email: 'admin@biblioteca.com' },
  { id: 2, usuario: 'lector', clave: 'libros', rol: 'usuario', nombre: 'Usuario Lector', email: 'lector@email.com' },
  { id: 3, usuario: 'usuario1', clave: '123', rol: 'usuario', nombre: 'Juan Pérez', email: 'juan@email.com' },
  { id: 4, usuario: 'usuario2', clave: 'abc', rol: 'usuario', nombre: 'María García', email: 'maria@email.com' }
];

export default function Login({ onLogin, setMostrarLogin, setEsVisitante, setVista, setMostrarRegistro }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializar localStorage con usuarios demo si no existen
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (!usuariosGuardados) {
      localStorage.setItem('usuarios', JSON.stringify(usuariosDemo));
    }
  }, []);

  const obtenerUsuarios = () => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : usuariosDemo;
  };

  const manejarLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simular un pequeño delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 500));

      const usuarios = obtenerUsuarios();
      const encontrado = usuarios.find(
        (u) => u.usuario === usuario && u.clave === clave
      );

      if (encontrado) {
        // Actualizar última conexión
        const usuariosActualizados = usuarios.map(u => 
          u.id === encontrado.id 
            ? { ...u, ultimaConexion: new Date().toISOString() }
            : u
        );
        localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
        localStorage.setItem('rol', encontrado.rol); // ✅ GUARDAR ROL
        
        onLogin(encontrado.usuario, encontrado.rol);
      } else {
        setError('Credenciales incorrectas. Verifica tu usuario y contraseña.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const volverAlInicio = () => {
    setMostrarLogin(false);
    setEsVisitante(false);
  };

  const irARegistro = () => {
    setMostrarLogin(false);
    setMostrarRegistro(true);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h2>📚 Iniciar Sesión</h2>
          <p>Bienvenido de vuelta, querido lector</p>
        </div>

        <form onSubmit={manejarLogin} className="login-form">
          <div className="input-group">
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
                if (error) setError(''); // Limpiar error al escribir
              }}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={clave}
              onChange={(e) => {
                setClave(e.target.value);
                if (error) setError(''); // Limpiar error al escribir
              }}
              required
            />
          </div>

          {error && <div className="error-message">❌ {error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Ingresando...' : '🔐 Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta?</p>
          <button 
            onClick={irARegistro}
            className="btn-link"
          >
            Registrarse gratis
          </button>
        </div>

        <div className="login-navigation">
          <button onClick={volverAlInicio} className="btn-back">
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}