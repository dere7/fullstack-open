import { CoursePart } from '../types';

interface ContentProp {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: ContentProp) => (
  <div>
    {courseParts.map((course, idx) => (
      <p key={idx}>
        {course.name} {course.exerciseCount}
      </p>
    ))}
  </div>
);
