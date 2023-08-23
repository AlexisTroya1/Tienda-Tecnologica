import React from 'react';
import './AcercaDe.css'; // Importar el archivo de estilos específico

function AcercaDe() {
  return (
    <div className="acerca-de-container">
      <div className="acerca-de-content">
        <h1>Acerca de Nosotros</h1>
        <p>
          Bienvenido a nuestra tienda tecnológica. Somos un equipo apasionado que se dedica a brindar
          soluciones tecnológicas innovadoras para tus necesidades. Nuestra misión es proporcionarte
          productos de alta calidad y un servicio excepcional.
        </p>

        <div className="colaboradores-section">
          <h2>Programadores</h2>
          <ul className="colaboradores-list">
            <li>Arias Esteban</li>
            <li>Carpio Luis</li>
            <li>Briones Kerli</li>
            <li>Troya Alexis</li>
            {/* Agrega más nombres de colaboradores aquí */}
          </ul>
        </div>

        <form className="acerca-de-form">
          {/* ... (formulario existente) */}
        </form>
      </div>
    </div>
  );
}

export default AcercaDe;
