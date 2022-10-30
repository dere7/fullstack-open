import express from 'express';
import patientsService from '../services/patients';
import { toNewPatientEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getAll());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientsService.create(newPatient);
    res.status(201).send(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        error: error.message,
      });
    }
  }
});

export default patientsRouter;
