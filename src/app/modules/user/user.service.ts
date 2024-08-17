import { startSession } from "mongoose";
import config from "../../config"
import { IAdmin } from "../admin/admin.interface"
import {  TUser } from "./user.interface"
import { generateAdminId } from "./user.utils";
import { Admin } from "../admin/admin.model";

import httpStatus from "http-status";
import { User } from "./user.model";
import AppError from "../../errors/AppError";






const createAdmin = async( admin:IAdmin, user:TUser):Promise<TUser|null>=>{
  
    if(!user.password){
        user.password = config.default_admin_pass as string;
    }

    user.role='admin';

    let newUserData = null;
    const session = await startSession();
    session.startTransaction();

    try{
        const id = await generateAdminId();
      
        
        user.id=id;
        user.mobileNo=admin.mobileNo;
        admin.id=id;

       
        
        const newAdmin = await Admin.create([admin],{session});

       
        
        if(!newAdmin.length){
            throw new AppError(httpStatus.BAD_REQUEST,"Failed to create admin");
        }

        user.admin = newAdmin[0]._id;

      
        
        const newUser = await User.create([user],{session});
       

        if(!newUser){
            throw new AppError(httpStatus.BAD_REQUEST,"Failed to create user");
        }
        newUserData = newUser[0];

        await session.commitTransaction();
       

    }catch(error){
        await session.abortTransaction();
         throw error;
    }finally{
        await session.endSession();
    }
  
    

    if(newUserData){
        newUserData = await User.findOne({id:newUserData.id}).populate('admin');


        return newUserData;
    }

    return null;

}




export const  UserServices ={
    createAdmin,
    
    
}