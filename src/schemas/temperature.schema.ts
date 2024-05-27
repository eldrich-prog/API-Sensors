import { z } from 'zod';

const temperatureSchema = z.object({
    value: z.number(),
});

export default temperatureSchema;
// Path: src/controllers/temperature.controller.ts