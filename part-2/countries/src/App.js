import { useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  const handleInput = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
    if (country === '') return;
    axios.get(`https://restcountries.com/v3.1/name/${country}`).then((res) => {
      if (res.status === 200) setCountries(res.data);
      if (res.data.length === 1) {
        const capital = res.data[0].capital[0];
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`
          )
          .then((res) => {
            if (res.status === 200) setWeather(res.data);
            console.log(res.data);
          });
      }
    });
  };

  return (
    <div>
      find countries
      <input value={country} onChange={handleInput} />
      {countries.length !== 0 &&
        (countries.length >= 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countries.length > 1 ? (
          countries.map((c) => (
            <p key={c.name.common}>
              {c.name.common}{' '}
              <button onClick={() => setCountries([c])}>show</button>
            </p>
          ))
        ) : (
          <>
            <h1>{countries[0].name.common}</h1>
            <p>captial {countries[0].capital.join(',')}</p>
            <p>area {countries[0].area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.values(countries[0].languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img src={countries[0].flags.png} alt="flag of some country" />
            {weather && (
              <>
                <h2>Weather in {weather.name}</h2>
                <p>temperature {weather.main.temp} Celcius</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>wind {weather.wind.speed} m/s</p>
              </>
            )}
          </>
        ))}
    </div>
  );
};

export default App;
