import { Router } from "express";
import { VisaInfoRoute } from "../modules/visaInformation/visaInformation.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/visainfo",
    route: VisaInfoRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
