import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://api.coincap.io/v2/assets/${id}`)
      .then(response => response.json())
      .then(data => setCoin(data.data));
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some(fav => fav.id === id));
  }, [id]);

  const handleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = storedFavorites.filter(fav => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      storedFavorites.push(coin);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    }
    setIsFavorite(!isFavorite);
  };

  if (!coin) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{coin.name}</h1>
      <p>Precio: ${coin.priceUsd}</p>
      <p>Market Cap: ${coin.marketCapUsd}</p>
      <p>Volumen (24h): ${coin.volumeUsd24Hr}</p>
      <button onClick={handleFavorite}>
        {isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
      </button>
    </div>
  );
};

export default Coin;

