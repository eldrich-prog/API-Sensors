import router from "./instance.routes";
import PressureController from "../controllers/pressure.controllers";

const httpController = new PressureController();

router.get('/pressure', httpController.get);
router.post('/pressure/:value', httpController.post);
router.get('/pressure/ultimate', httpController.getLatest);

export default router;
// Path: src/schemas/temperature.schema.ts