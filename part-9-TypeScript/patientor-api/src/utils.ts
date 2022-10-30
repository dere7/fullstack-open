import { Gender, NewPatient } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseText(object.name, 'name'),
    ssn: parseText(object.ssn, 'ssn'),
    dateOfBirth: parseDOB(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation, 'occupation'),
  };
  return newPatient;
};

const parseText = (text: unknown, name: string): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing :' + name);
  }
  return text;
};

const parseDOB = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
