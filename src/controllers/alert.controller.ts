import { Request,Response  } from "express";
import { prisma } from "../db/prisma.instance";

class AlertController {
    async get(req: Request, res: Response): Promise<any> {
        const alert = await prisma.alert.findMany();
        return res.status(200).json(alert);
    }

    async post(req: Request, res: Response): Promise<any> {
        req.body.value = parseFloat(req.params.value);
        const newAlert = await prisma.alert.create({
            data: req.body
        });
        return res.status(201).json({ message: 'Alert created',
        alert: newAlert.value,
        time: newAlert.createdAt});
    }

    async getLatest(req: Request, res: Response): Promise<any> {
        const alerts = await prisma.alert.findFirstOrThrow({
            orderBy: {
                id: 'desc'
            }
        });
        return res.status(200).json({ mesaaage: 'Update Alert', id: alerts.id, alert: alerts.value, time: alerts.createdAt});
    }
}