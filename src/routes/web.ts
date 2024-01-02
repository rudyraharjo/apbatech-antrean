import { Router } from "express";
import authRoute from "../module/auth/auth.route";
import antrianRoute from "../module/antrian/antrian.route";
import checkAuthToken from "../middlewares/CheckAuthTokenMiddleware";

const routerWeb = Router();

routerWeb.use("/auth", authRoute);
routerWeb.use(checkAuthToken);
routerWeb.use("/antrean", antrianRoute);

export default routerWeb;