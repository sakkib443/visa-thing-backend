import { Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";

export type TUser = {
  id: string;
  mobileNo:string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?:Date;
  role: 'admin' | 'user';
  admin?:Types.ObjectId | IAdmin;
  user?:Types.ObjectId ;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
