import { Model } from "mongoose";

export type UserName ={
    firstName:string,
    lastName:string,
};


export interface IAdmin{
    id:string,
    name:UserName,
    profileImage:string,
    email:string,
    mobileNo:string,
    address:string,

}

export type AdminModel = Model<IAdmin,Record<string,unknown>>;