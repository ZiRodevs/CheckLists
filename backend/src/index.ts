import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import testRoute from './routes';

const app: Express = express();

app.use(cors({
    credentials: true,
}));
app.use(bodyParser.json());

app.use((request: Request, response: Response, next: NextFunction) => {
    console.log(`Received ${request.method} request for ${request.url}`);
    next();
});

const PORT = process.env.PORT;

app.use(testRoute);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});