import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.services";



const loginUser = catchAsync(async(req,res)=>{
    const result= await AuthService.loginUser(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User logged in succesfully!',
        data:result, 
    })

})

export const AuthControllers = {
    loginUser,
}