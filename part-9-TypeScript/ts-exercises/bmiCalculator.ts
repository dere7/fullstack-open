interface BMIData {
  desc: string;
  range: [number, number];
}

interface BMIVariables {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) throw new Error("height can't be <= 0");
  if (weight <= 0) throw new Error("weight can't be <= 0");
  const bmi: number = weight / (height / 100) ** 2;
  const categories: Array<BMIData> = [
    {
      desc: 'Underweight (Severe thinness)',
      range: [-Infinity, 16.0],
    },
    {
      desc: 'Underweight (Moderate thinness)',
      range: [16.0, 16.9],
    },
    {
      desc: 'Underweight (Mild thinness)',
      range: [17.0, 18.4],
    },
    {
      desc: 'Normal range',
      range: [18.5, 24.9],
    },
    {
      desc: 'Overweight (Pre-obese)',
      range: [25.0, 29.9],
    },
    {
      desc: 'Obese (Class I)',
      range: [30.0, 34.9],
    },
    {
      desc: 'Obese (Class II)',
      range: [35.0, 39.9],
    },
    {
      desc: 'Obese (Class III)',
      range: [40.0, Infinity],
    },
  ];

  const category = categories.find(
    ({ range }) => bmi >= range[0] && bmi < range[1]
  );
  return category ? category.desc : 'not defined';
};

const parseArgs = (args: Array<string>): BMIVariables => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const weight = Number(args[2]);
  const height = Number(args[3]);

  if (isNaN(weight) || isNaN(height)) {
    throw new Error('both arguments must be numbers');
  }

  return {
    height,
    weight,
  };
};

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(weight, height));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error occured:', error.message);
  }
}
