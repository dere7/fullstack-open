type Rating = 1 | 2 | 3;

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArgs {
  target: number;
  dailyExercises: Array<number>;
}

export const calculateExercises = (
  target: number,
  dailyExercise: Array<number>
): ExerciseResult => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter((exer) => exer > 0).length;
  const average: number =
    dailyExercise.reduce((prev, curr) => prev + curr, 0) / periodLength;
  let rating: Rating;
  let ratingDescription;
  if (Math.ceil(average) > 2) {
    rating = 3;
    ratingDescription = 'Welldone! keep it up';
  } else if (Math.ceil(average) > 1) {
    rating = 2;
    ratingDescription = 'Not bad! always strive to push limits';
  } else {
    rating = 1;
    ratingDescription = 'Poor! keep your commitments';
  }

  return {
    periodLength,
    trainingDays,
    success: rating >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: Array<string>): ExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const sanitized = args.slice(2).map((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error('all arguments must be numbers');
    }
    return Number(hour);
  });

  return {
    dailyExercises: sanitized.slice(1),
    target: sanitized[0],
  };
};

try {
  const { target, dailyExercises } = parseArguments(process.argv);
  console.log(calculateExercises(target, dailyExercises));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error occured:', error.message);
  }
}
