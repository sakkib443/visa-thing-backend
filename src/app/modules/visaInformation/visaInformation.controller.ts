import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VisaInfoService } from "./visaInformation.service";

const createVisaInfo = catchAsync(async (req, res, next) => {
  const result = await VisaInfoService.createVisaInfoInToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "visa is created successfuly",
    data: result,
  });
});
const singleVisaFind = catchAsync(async (req, res, next) => {
  const { country } = req.params;
  const result = await VisaInfoService.findSigleVisaInFoFromDB(
    country as string
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "visa is retrived successfuly",
    data: result,
  });
});
export const VisaInfoController = {
  createVisaInfo,
  singleVisaFind,
};
