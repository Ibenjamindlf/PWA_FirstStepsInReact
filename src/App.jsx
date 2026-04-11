import React from 'react';
import Navbar from './components/Navbar/Navbar'; 
import Home from './pages/Home/home';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Home />

        {/* el style de listado deberia ser modificado, lo dejo asi para chequear que funcione el listado */}
        <section id="mi-listado" style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '5rem 2rem' }}>
          <h2>Aquí irá el listado de películas</h2>
        </section>

      </main>
    </div>
  );
};

export default App;
