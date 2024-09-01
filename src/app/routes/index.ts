import { Router } from "express";
import { VisaInfoRoute } from "../modules/visaInformation/visaInformation.route";
import { userRoute } from "../modules/User/user.route";
import { AuthRoute } from "../modules/Auth/auth.Route";

const router = Router();

const moduleRoutes = [
  {
    path: "/visainfo",
    route: VisaInfoRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
