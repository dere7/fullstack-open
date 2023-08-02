import { CoursePart } from '../utils/types';
import { Part } from './Part';

interface ContentProp {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: ContentProp) => (
  <div>
    {courseParts.map((course, idx) => (
      <Part key={idx} coursePart={course} />
    ))}
  </div>
);
