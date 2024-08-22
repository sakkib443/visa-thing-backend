import { Model, Types } from "mongoose";
import { IAdmin } from "../admin/admin.interface";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  id: string;
  mobileNo:string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?:Date;
  role: 'admin' | 'user';
  admin?:Types.ObjectId | IAdmin;
  user?:Types.ObjectId ;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};


export interface UserModel extends Model<TUser>{
  //instance methods for checking if the user exixt
  isUserExist(id:string):Promise<TUser>;

  isPasswordMatched(
    plainTextPassword:string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp:number,
  ):boolean;
}

export type TUserRole = keyof typeof USER_ROLE;