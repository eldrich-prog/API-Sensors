import { Request, Response } from 'express';
import { prisma } from '../db/prisma.instance';
import HttpInterface from './interface.http';



class PressureController extends HttpInterface {

    async get(req: Request, res: Response): Promise<any> {
        const Pressure = await prisma.pressure.findMany();
        return res.status(200).json(Pressure);
    }


    async post(req: Request, res: Response): Promise<any> {
        req.body.value = parseFloat(req.params.value);
        const newPressure = await prisma.pressure.create({
            data: req.body
        });
        return res.status(201).json({ message: 'Pressure created',
        Pressure: newPressure.value,
        time: newPressure.createdAt});
    }

    async getLatest(req: Request, res: Response): Promise<any> {
        const Pressures = await prisma.pressure.findFirstOrThrow({
            orderBy: {
                id: 'desc'
            }
        });
        return res.status(200).json({ mesaaage: 'Update Pressure', id: Pressures.id, Pressure: Pressures.value, time: Pressures.createdAt});
    }

}

export default PressureController;