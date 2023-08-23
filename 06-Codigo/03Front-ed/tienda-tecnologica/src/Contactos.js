import React from 'react';

function Contactos() {
  return (
    <div>
      <h1 className="title">Contactos</h1>
      <div className="contact-container">
        <div className="address">
          <h2>Matriz Sangolquí</h2>
          <p>Dirección: Av. General Rumiñahui S/N y Ambato</p>
          <p>Teléfono: (593) 2.3989.400</p>
          <p>Correo: comunicacion@ugp.espe.edu.ec</p>
          <p>Web: https://ugp.espe.edu.ec/</p>
          <p>Sangolquí – Ecuador</p>
        </div>
        <div className="map-container">
          <iframe
            title="Ubicación GPS"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3989.758322751073!2d-78.44336450944827!3d-0.3142161657729374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1692229892180!5m2!1ses!2sec"
            width="800"
            height="410"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contactos;
