import { prisma } from '../config/prisma-client';
import { Request, Response } from 'express';
import { Task, Item } from '../interfaces/task-interface';

export const createTask = async (request: Request, response: Response) => {
    try {
        const { description, status, items } = request.body as Task;

        const createdTask = await prisma.task.create({
            data: {
                description,
                status: status || 'PENDING',
                items: {
                    create: items?.map((itemData: Item) => {
                        return {
                            title: itemData.title,
                            done: itemData.done || false,
                        };
                    })
                }
            },
            include: {
                items: true
            }
        });

        response.status(200).json({ createdTask });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'An error occurred' });
    }
};