import { CoursePart } from '../utils/types';

interface TotalProp {
  courseParts: CoursePart[];
}

export const Total = ({ courseParts }: TotalProp) => (
  <p>
    Number of exercises{' '}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);
