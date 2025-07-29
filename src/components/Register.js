// components/Register.js
import React, { useState } from 'react';
import './Login.css'; // Reutilizamos los estilos del login

export default function Register({ setMostrarRegistro, setMostrarLogin }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    usuario: '',
    clave: '',
    confirmarClave: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const validarFormulario = () => {
    // Validar que todos los campos estén llenos
    if (!formData.nombre.trim() || !formData.email.trim() || 
        !formData.usuario.trim() || !formData.clave || !formData.confirmarClave) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }

    // Validar que las contraseñas coincidan
    if (formData.clave !== formData.confirmarClave) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    // Validar longitud de contraseña
    if (formData.clave.length < 3) {
      setError('La contraseña debe tener al menos 3 caracteres');
      return false;
    }

    // Validar longitud de usuario
    if (formData.usuario.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return false;
    }

    return true;
  };

  const verificarUsuarioExistente = () => {
    // Obtener usuarios existentes del localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar si el usuario ya existe
    const usuarioExiste = usuariosGuardados.some(user => 
      user.usuario === formData.usuario || user.email === formData.email
    );

    return usuarioExiste;
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar formulario
      if (!validarFormulario()) {
        setLoading(false);
        return;
      }

      // Verificar si el usuario ya existe
      if (verificarUsuarioExistente()) {
        setError('El usuario o email ya están registrados');
        setLoading(false);
        return;
      }

      // Crear nuevo usuario
      const nuevoUsuario = {
        id: Date.now(), // ID único basado en timestamp
        nombre: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        usuario: formData.usuario.trim(),
        clave: formData.clave,
        rol: 'usuario', // Por defecto todos son usuarios normales
        fechaRegistro: new Date().toISOString()
      };

      // Obtener usuarios existentes y agregar el nuevo
      const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuariosExistentes.push(nuevoUsuario);

      // Guardar en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

      // Simular un pequeño delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mostrar mensaje de éxito y redirigir al login
      alert('🎉 ¡Registro exitoso! Ahora puedes iniciar sesión');
      setMostrarRegistro(false);
      setMostrarLogin(true);

    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Ocurrió un error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const volverAlLogin = () => {
    setMostrarRegistro(false);
    setMostrarLogin(true);
  };

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
              name="nombre"
              placeholder="Ingresa tu nombre completo"
              value={formData.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="input-group">
            <label>Usuario</label>
            <input
              type="text"
              name="usuario"
              placeholder="Elige un nombre de usuario"
              value={formData.usuario}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="clave"
              placeholder="Crea una contraseña segura"
              value={formData.clave}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmarClave"
              placeholder="Confirma tu contraseña"
              value={formData.confirmarClave}
              onChange={manejarCambio}
              required
            />
          </div>

          {error && <div className="error-message">❌ {error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Registrando...' : '🚀 Crear cuenta'}
          </button>
        </form>

        <div className="login-footer">
          <p>¿Ya tienes cuenta?</p>
          <button 
            onClick={volverAlLogin}
            className="btn-link"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}