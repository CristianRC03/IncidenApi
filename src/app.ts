import express, { Request, Response } from 'express';
import { envs } from './config/envs';
import { MongoDatabase } from './data/init';
import { IncidentModel } from './data/models/incident.model';
import { AppRoutes } from './presentation/routes';

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);

(async () => await MongoDatabase.connect({
  mongoUrl: envs.MONGO_URL,
  dbName: envs.MONGO_DB
}))();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});