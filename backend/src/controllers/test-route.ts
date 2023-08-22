import { Request, Response } from 'express';

export const testRoute = async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const result = id ? `we got this ${id} param` : 'Hello world!';

        response.status(200).json({ result });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'An error occurred' });
    }
};