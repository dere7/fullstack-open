import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.end('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (isNaN(weight) || isNaN(height)) {
      throw new Error('weight and height must be numbers');
    }
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        error: 'malformatted parameters',
      });
    }
  }
});

app.post('/exercises', express.json(), (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!target || !daily_exercises) {
      throw new Error('parameters missing');
    }
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
      throw new Error('malformatted parameters');
    }

    daily_exercises.forEach((d) => {
      if (typeof d !== 'number') throw new Error('malformatted parameters');
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.json(calculateExercises(Number(target), daily_exercises));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
