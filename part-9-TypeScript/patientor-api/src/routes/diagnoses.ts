import express from 'express';
import diagnosesService from '../services/diagnoses';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnosesService.getAll());
});

export default diagnosesRouter;
