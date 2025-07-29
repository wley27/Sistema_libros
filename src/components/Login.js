// components/Login.js
import React, { useState } from 'react';
import './Login.css';

const usuariosDemo = [
  { usuario: 'admin', clave: '1234', rol: 'admin', nombre: 'Administrador' },
  { usuario: 'lector', clave: 'libros', rol: 'usuario', nombre: 'Usuario Lector' },
  { usuario: 'usuario1', clave: '123', rol: 'usuario', nombre: 'Juan Pérez' },
  { usuario: 'usuario2', clave: 'abc', rol: 'usuario', nombre: 'María García' }
];

export default function Login({ onLogin, setMostrarLogin, setEsVisitante, setVista }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const manejarLogin = (e) => {
    e.preventDefault();
    const encontrado = usuariosDemo.find(
      (u) => u.usuario === usuario && u.clave === clave
    );
    if (encontrado) {
      onLogin(encontrado.usuario, encontrado.rol); // pasar usuario y rol
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const volverAlInicio = () => {
    setMostrarLogin(false);
    setEsVisitante(false);
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de registro real
    alert('Función de registro será implementada próximamente');
    setMostrarRegistro(false);
  };

  if (mostrarRegistro) {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-header">
            <h2>📚 Crear Cuenta</h2>
            <p>Únete a nuestra comunidad de lectores</p>
          </div>

          <form onSubmit={manejarRegistro} className="login-form">
            <div className="input-group">
              <label>Nombre completo</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label>Usuario</label>
              <input
                type="text"
                placeholder="Elige un nombre de usuario"
                required
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Crea una contraseña segura"
                required
              />
            </div>

            <div className="input-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              🚀 Crear cuenta
            </button>
          </form>

          <div className="login-footer">
            <p>¿Ya tienes cuenta?</p>
            <button 
              onClick={() => setMostrarRegistro(false)}
              className="btn-link"
            >
              Iniciar sesión
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
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">❌ {error}</div>}

          <button type="submit" className="btn-primary">
            🔐 Entrar
          </button>
        </form>


        <div className="login-footer">
          <p>¿No tienes cuenta?</p>
          <button 
            onClick={() => setMostrarRegistro(true)}
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