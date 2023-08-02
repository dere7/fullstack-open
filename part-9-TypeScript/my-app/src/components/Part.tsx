import { assertNever } from '../utils';
import { CoursePart } from '../utils/types';

interface PartProp {
  coursePart: CoursePart;
}

export const Part = ({ coursePart }: PartProp) => {
  let extras;
  switch (coursePart.kind) {
    case 'basic':
      extras = <em>{coursePart.description}</em>;
      break;
    case 'group':
      extras = <span>project exercises {coursePart.groupProjectCount}</span>;
      break;
    case 'background':
      extras = (
        <span>
          <em>{coursePart.description}</em> <br />
          submit to {coursePart.backgroundMaterial}
        </span>
      );
      break;
    case 'special':
      extras = (
        <span>
          <em>{coursePart.description}</em>
          <br />
          required skills: {coursePart.requirements.join(', ')}
        </span>
      );
      break;
    default:
      assertNever(coursePart);
  }

  return (
    <p>
      <b>
        {coursePart.name} {coursePart.exerciseCount}
      </b>
      <br />
      {extras}
    </p>
  );
};
