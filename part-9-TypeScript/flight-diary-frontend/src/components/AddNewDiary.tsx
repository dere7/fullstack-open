import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { NewDiaryEntry, Visibility, Weather } from '../types';

export const baseUrl = '/api/diaries';

interface AddNewDiaryProp {
  handleAdd: (diary: NewDiaryEntry) => Promise<void>;
}

export const AddNewDiary = ({ handleAdd }: AddNewDiaryProp) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [error, setError] = useState();

  const reset = () => {
    setDate('');
    setVisibility(Visibility.Ok);
    setWeather(Weather.Sunny);
    setComment('');
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleAdd({ date, weather, visibility, comment })
      .then(() => {
        reset();
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data);
        }
      });
  };

  return (
    <div>
      <h3>Add new Diary</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label htmlFor="visibility">
          Visibility: great
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Ok)}
          />
          Poor
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </label>
        <label htmlFor="weather">
          Weather: sunny
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Sunny)}
          />
          rainy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Rainy)}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Windy)}
          />
        </label>
        <label htmlFor="comment">
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <input type="submit" value="add" />
      </form>
    </div>
  );
};
