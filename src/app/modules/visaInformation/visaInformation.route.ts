import { Router } from "express";
import { VisaInfoController } from "./visaInformation.controller";

const router = Router();

router.post("/create-visa", VisaInfoController.createVisaInfo);
router.get("/:country", VisaInfoController.singleVisaFind);

export const VisaInfoRoute = router;
