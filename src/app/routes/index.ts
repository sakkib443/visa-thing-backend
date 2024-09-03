import { Router } from "express";

import { userRoute } from "../modules/User/user.route";
import { AuthRoute } from "../modules/Auth/auth.Route";

const router = Router();

const moduleRoutes = [
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
