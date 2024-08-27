import { TVisaInfo } from "./visaInformation.interface";
import { VisaInfoModel } from "./visaInformation.model";

const createVisaInfoInToDB = async (payload: TVisaInfo) => {
  const result = await VisaInfoModel.create(payload);
  return result;
};
const findVisaInFoFromDB = async () => {
  const result = await VisaInfoModel.find();
  return result;
};
const findSigleVisaInFoFromDB = async (country: string) => {
  const result = await VisaInfoModel.find({ country });
  return result;
};
export const VisaInfoService = {
  createVisaInfoInToDB,
  findSigleVisaInFoFromDB,
  findVisaInFoFromDB,
};
