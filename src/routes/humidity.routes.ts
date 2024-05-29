import router from "./instance.routes";
import HumidityController from "../controllers/humidity.controller";

import safeParse from "../middlewares/safeParse.validator";

const humidityController = new HumidityController();

router.get('/humidity', humidityController.get);
router.post('/humidity/:value', humidityController.post);
router.get('/humidity/ultimate', humidityController.getLatest);

export default router;
// Path: src/schemas/temperature.schema.ts