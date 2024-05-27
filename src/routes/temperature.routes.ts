import router from "./instance.routes";
import TemperatureController from "../controllers/temperature.controller";
import temperatureSchema from "../schemas/temperature.schema";
import safeParse from "../middlewares/safeParse.validator";

const temperatureController = new TemperatureController();

router.get('/temperature', temperatureController.get);
router.post('/temperature/:value', temperatureController.post);
router.get('/temperature/latest', temperatureController.getLatest);

export default router;
// Path: src/schemas/temperature.schema.ts