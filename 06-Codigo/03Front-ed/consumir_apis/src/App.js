import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showIdsOnly, setShowIdsOnly] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      axios.get(`https://api.plos.org/search?q=title:${searchTerm}&fl=id,title,author&rows=10`)
        .then(response => {
          setJsonData(response.data.response.docs);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setJsonData([]);
  };

  const handleToggleIdsOnly = () => {
    setShowIdsOnly(!showIdsOnly);
  };

  return (
    <div className="container">
      <h1>Consumo de API PLOS</h1>
      <div>
        <input
          type="text"
          placeholder="Ingrese parámetro a buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search" onClick={handleSearch}>Buscar</button>
        <button className="clear" onClick={handleClearSearch}>Limpiar búsqueda</button>
        <button onClick={handleToggleIdsOnly}>
          {showIdsOnly ? 'Observar en detalle' : 'Observar solo IDs'}
        </button>
      </div>
      {showIdsOnly ? (
        <div className="id-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {jsonData.map(item => (
                <tr key={item.id}>
                  <td>
                    <a
                      href={`https://journals.plos.org/plosone/article?id=${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.id}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <pre>
          {jsonData.map(item => (
            <div key={item.id}>
              {JSON.stringify(item, null, 2)}
            </div>
          ))}
        </pre>
      )}
      <footer>
        Desarrollado por: [Grupo 9 :Esteban Arias , Luis Carpio, Alexis Troya, Kerli Briones] - {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
