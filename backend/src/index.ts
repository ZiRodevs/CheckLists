import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import testRoute from './routes';
import { prisma } from './config/prisma-client';


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


const server = app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}/`);
    // example query - get all users
    // const getAll = await prisma.tasks_test.findMany();
})

server.on('close', async () => {
    console.log('Received SIGINT signal.');
    await prisma.$disconnect();
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    })
});

