import { Request, Response } from 'express';
import { prisma } from '../db/prisma.instance';
import HttpInterface from './interface.http';
import { time } from 'console';


class TemperatureController extends HttpInterface {

    async get(req: Request, res: Response): Promise<any> {
        const temperatures = await prisma.temperature.findMany();
        return res.status(200).json(temperatures);
    }

    async post(req: Request, res: Response): Promise<any> {
        req.body.value = parseFloat(req.params.value);
        const newTemperature = await prisma.temperature.create({
            data: req.body
        });
        return res.status(201).json({ message: 'Temperature created',
        temperature: newTemperature.value,
        time: newTemperature.createdAt});
    }

    async getLatest(req: Request, res: Response): Promise<any> {
        const temperatures = await prisma.temperature.findFirstOrThrow({
            orderBy: {
                id: 'desc'
            }
        });
        return res.status(200).json({ mesaaage: 'Update Temperature', id: temperatures.id, temperature: temperatures.value, time: temperatures.createdAt});
    }

}

export default TemperatureController;