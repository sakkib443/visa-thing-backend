import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.Controllar";

const router = Router();
router.post(
  "/signup",

  AuthControllers.registerUser
);
router.post("/signin", AuthControllers.userLogin);
export const AuthRoute = router;
