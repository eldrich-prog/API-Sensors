import { z } from 'zod';

const humiditySchema = z.object({
    value: z.number(),
});

export default humiditySchema;
// Path: src/controllers/temperature.controller.ts