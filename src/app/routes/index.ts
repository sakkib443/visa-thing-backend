import { Router } from "express";
import { VisaInfoRoute } from "../modules/visaInformation/visaInformation.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/visainfo",
    route: VisaInfoRoute,
  },
  {
    path:"/users",
    route:UserRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
