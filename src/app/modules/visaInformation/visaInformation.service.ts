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
const searchVisaFromDB = async (searchProduct: string) => {
  const regex = new RegExp(searchProduct, "i");
  const result = await VisaInfoModel.find({
    $or: [{ name: regex }, { visaType: regex }, { country: regex }],
  });
  // console.log(result);
  return result;
};
export const VisaInfoService = {
  createVisaInfoInToDB,
  findSigleVisaInFoFromDB,
  findVisaInFoFromDB,
  searchVisaFromDB,
};
