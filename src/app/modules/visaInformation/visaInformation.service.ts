import { TVisaInfo } from "./visaInformation.interface";
import { VisaInfoModel } from "./visaInformation.model";

const createVisaInfoInToDB = async (payload: TVisaInfo) => {
  const result = await VisaInfoModel.create(payload);
  return result;
};
export const VisaInfoService = {
  createVisaInfoInToDB,
};
