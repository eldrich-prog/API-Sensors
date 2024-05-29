import express, { Express } from 'express';
import temperatureRoutes from './routes/temperature.routes';
import humidityRoutes from './routes/humidity.routes';
import pressureRoutes from './routes/pressure.routes';

import cors from 'cors';

const app:Express = express();
const PORT: Number = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', temperatureRoutes);
app.use('/api', humidityRoutes);
app.use('/api', pressureRoutes);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

export default app;