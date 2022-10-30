import { Diagnose } from '../types';
import data from '../../data/diagnoses.json';

const diagnosesData = data as Diagnose[];

const getAll = (): Diagnose[] => {
  return diagnosesData;
};

export default {
  getAll,
};
