import data from '../../data/patients.json';
import { v4 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatientEntry, Patient } from '../types';

const patientsData = data as Patient[];

const getAll = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const create = (data: NewPatient) => {
  const newPatient: Patient = {
    ...data,
    id: uuid(),
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  create,
};
