import { useEffect, useState } from 'react';
import { AddNewDiary, baseUrl } from './components/AddNewDiary';
import { DairiesList } from './components/DiariesList';
import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(({ data }) => setDiaries(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleAddNew = (diary: NewDiaryEntry) =>
    axios.post(baseUrl, diary).then((res) => {
      setDiaries((state) => state?.concat(res.data));
      console.log(res.data);
    });

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!diaries) return <p>loading...</p>;

  return (
    <>
      <AddNewDiary handleAdd={handleAddNew} />
      <DairiesList diaries={diaries} />
    </>
  );
}

export default App;
