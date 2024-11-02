import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h1>Criptomonedas Favoritas</h1>
      <ul>
        {favorites.map(favorite => (
          <li key={favorite.id}>
            <Link to={`/coin/${favorite.id}`}>{favorite.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
