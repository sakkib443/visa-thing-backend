import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VisaInfoService } from "./visaInformation.service";

const createVisaInfo = catchAsync(async (req, res, next) => {
  const result = await VisaInfoService.createVisaInfoInToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "user create is successfuly",
    data: result,
  });
});
export const VisaInfoController = {
  createVisaInfo,
};
