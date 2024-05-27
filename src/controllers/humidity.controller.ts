import { Request, Response } from 'express';
import { prisma } from '../db/prisma.instance';
import HttpInterface from './interface.http';



class HumidityController extends HttpInterface {

    async get(req: Request, res: Response): Promise<any> {
        const humidity = await prisma.humidity.findMany();
        return res.status(200).json(humidity);
    }


    async post(req: Request, res: Response): Promise<any> {
        req.body.value = parseFloat(req.params.value);
        const newHumidity = await prisma.humidity.create({
            data: req.body
        });
        return res.status(201).json({ message: 'Temperature created',
        humidity: newHumidity.value,
        time: newHumidity.createdAt});
    }

    async getLatest(req: Request, res: Response): Promise<any> {
        const humiditys = await prisma.humidity.findFirstOrThrow({
            orderBy: {
                id: 'desc'
            }
        });
        return res.status(200).json({ mesaaage: 'Update Humidity', id: humiditys.id, humidity: humiditys.value, time: humiditys.createdAt});
    }

}

export default HumidityController;