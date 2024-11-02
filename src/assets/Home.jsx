import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('https://api.coincap.io/v2/assets')
      .then(response => response.json())
      .then(data => setCoins(data.data));
  }, []);

  return (
    <div>
      <h1>Principales Criptomonedas</h1>
      <ul>
        {coins.map(coin => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>{coin.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
