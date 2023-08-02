import { DiaryEntry } from '../types';

interface DiariesListProp {
  diaries: DiaryEntry[];
}

export const DairiesList = ({ diaries }: DiariesListProp) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map(({ date, id, visibility, weather }) => (
        <div key={id}>
          <h4>{date}</h4>
          <p>
            visibility: {visibility} <br />
            weather: {weather}
          </p>
        </div>
      ))}
    </div>
  );
};
