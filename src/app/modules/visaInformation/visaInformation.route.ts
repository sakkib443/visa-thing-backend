import { Router } from "express";
import { VisaInfoController } from "./visaInformation.controller";

const router = Router();

router.post("/create-visainfo", VisaInfoController.createVisaInfo);

export const VisaInfoRoute = router;
