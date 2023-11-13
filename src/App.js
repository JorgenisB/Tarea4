import './App.css';
import React, { useState, useEffect } from 'react';

const ContactList = ({ contacts }) => {
  return (
    <div className="contact-list">
      <h1>Lista de Contactos</h1>
      <div className="contact-list-container">
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              {`${contact.nombre} ${contact.apellido} - Teléfono: ${contact.telefono}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AddContactForm = ({ onAddContact }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      nombre,
      apellido,
      telefono
    };

    onAddContact(newContact);

    
    setNombre('');
    setApellido('');
    setTelefono('');
  };

  return (
    <div className="contact-form">
      <h1>Agregar Nuevo Contacto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <button type="submit">Agregar Contacto</button>
      </form>
    </div>
  );
};

const App = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
  
    fetch('http://www.raydelto.org/agenda.php')
      .then(response => response.json())
      .then(data => setContactos(data))
      .catch(error => console.error('Error al cargar la lista de contactos:', error));
  }, []);

  const handleAddContact = (newContact) => {
    
    fetch('http://www.raydelto.org/agenda.php', {
      method: 'POST',
      body: JSON.stringify(newContact)
    })
      .then(response => response.json())
      .then(data => setContactos([...contactos, data]))
      .catch(error => console.error('Error al agregar el contacto:', error));
  };

  return (
    <div className="container">
      <AddContactForm onAddContact={handleAddContact} />
      <ContactList contacts={contactos} />
    </div>
  );
};



function cambiarColorFondo() {
  const nuevoColor = generarColorAleatorio();
  document.body.style.backgroundColor = nuevoColor;
}

function generarColorAleatorio() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Cambia el color de fondo cada 5 segundos (5000 milisegundos)
setInterval(cambiarColorFondo, 5000);


export default App;
