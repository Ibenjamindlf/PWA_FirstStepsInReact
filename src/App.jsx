import React from 'react';
import Navbar from './components/Navbar/Navbar'; 
import MovieList from './components/MovieList/MovieList';
import Home from './pages/Home/home';
import imgInterestellar from './assets/interestellar.jpg';
import Footer from './components/Footer/Footer';

const App = () => {


  const peliculasDePrueba = [
  { 
    id: 1, 
    title: 'Inception', 
    year: 2010, 
    genre: 'Ciencia Ficción / Thriller',
    director: 'Christopher Nolan',
    actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
    production: 'Warner Bros. Pictures',
    rating: 8.8,
    review: 'Un hábil ladrón es absolutamente el mejor en el peligroso arte de la extracción, robando secretos valiosos de lo profundo del subconsciente durante el estado de sueño.'
  },
  { 
    id: 2, 
    title: 'Interstellar', 
    year: 2014, 
    image: imgInterestellar,
    genre: 'Aventura / Drama',
    director: 'Christopher Nolan',
    actors: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
    production: 'Paramount Pictures',
    rating: 8.6,
    review: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.'
  },
  { 
    id: 3, 
    title: 'The Dark Knight', 
    year: 2008, 
    genre: 'Acción / Crimen',
    director: 'Christopher Nolan',
    actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
    production: 'Warner Bros.',
    rating: 9.0,
    review: 'Cuando la amenaza conocida como el Joker causa estragos y caos en la gente de Gotham, Batman debe aceptar una de las mayores pruebas psicológicas y físicas.'
  }
];
  return (
    <div>
      <Navbar/>
      <main>
        <Home/>        
        <MovieList movies={peliculasDePrueba}/>
      </main>
      <Footer/>
    </div>
  );
};

export default App;
