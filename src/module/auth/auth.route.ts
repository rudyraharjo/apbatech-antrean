import { Router } from "express";

import * as authController from './auth.controller';

const router = Router();

router.get("/generateToken", authController.generateToken);
router.post("/register", authController.register);

export default router;