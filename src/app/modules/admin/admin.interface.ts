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
    isDeleted: boolean;

}

export interface AdminModel extends Model<IAdmin>{
    isUserExists(id: string): Promise<IAdmin | null>;
};