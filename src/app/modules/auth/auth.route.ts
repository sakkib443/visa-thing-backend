import { Router } from "express";

import { UserValidation } from "../User/user.validation";
import { AuthControllers } from "./auth.Controllar";

const router = Router();
router.post("/signup", AuthControllers.registerUser);
router.post("/signin", AuthControllers.userLogin);
export const AuthRoute = router;
