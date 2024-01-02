import { Router } from "express";

import * as antrianController from './antrian.controller';

const router = Router();

router.get("/status/:kodepoli/:tglperiksa", antrianController.getAntrianByKodePoliAndTgl);
router.post("/create", antrianController.createAntrian);
router.get("/sisapeserta/:nomorkartu_jkn/:kodepoli/:tglperiksa", antrianController.getRemainingByNokartuKodePoliAndTglPeriksa);
router.put("/batal", antrianController.cancelAntrian);

export default router;