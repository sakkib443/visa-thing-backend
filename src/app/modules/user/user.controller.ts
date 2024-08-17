
import { RequestHandler } from 'express-serve-static-core';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.service';

const createAdmin:RequestHandler= catchAsync(async(req:Request,res:Response)=>{

    
        const {admin,...userData}=req.body;
          const result = await UserServices.createAdmin(admin,userData);

        
          

        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:"Admin Created succesfully",
            data:result,
        })

    }
)



export const  UserControler = {
    createAdmin,
   
}