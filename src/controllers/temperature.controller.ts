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
    async postSensors(req: Request, res: Response): Promise<any> {
        const { temperature, humidity} = req.query;
        const pressure = "1027 hPa";
        console.log(temperature, humidity, pressure);
        const newTem = await prisma.temperature.create({
            data: {
                value: parseFloat(temperature as string)
            }
        });
        const newHumidity = await prisma.humidity.create({
            data: {
                value: parseFloat(humidity as string)
            }
        });
        const newPressure = await prisma.pressure.create({
            data: {
                value: parseFloat(pressure as string)
            }
        });

        return res.status(201).json({ message: 'Temperature and Humidity created'});
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