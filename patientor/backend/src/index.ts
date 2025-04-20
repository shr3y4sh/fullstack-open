import express, {
	Request,
	Response,
	NextFunction,
	ErrorRequestHandler
} from 'express';
import cors from 'cors';
import 'dotenv/config';

import diagnosisRouter from './routes/diagnose';
import patientRouter from './routes/patients';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.use('/api/patients', patientRouter);

app.use(
	(
		error: ErrorRequestHandler,
		_req: Request,
		_res: Response,
		_next: NextFunction
	) => {
		console.log(error);
	}
);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
