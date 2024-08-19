import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.services";
import config from "../../config";
import AppError from "../../errors/AppError";



const loginUser = catchAsync(async(req,res)=>{
    const result= await AuthService.loginUser(req.body);

    const {refreshToken,accessToken,needsPasswordChange}=result;
    res.cookie('refreshToken',refreshToken,{
        secure: config.NODE_ENV === 'production',
        httpOnly:true,
        sameSite:'none',
        maxAge: 1000* 60*60*24*365,
    });


    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'User logged in succesfully!',
        data:{
            accessToken,
            needsPasswordChange,
        }, 
    })

});

const changePassword = catchAsync(async (req,res)=>{
    const {...passwordData}= req.body;

    const result = await AuthService.changePassword(req.user,passwordData);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:'Password is Updated succesfully!',
        data:result,
    });
});

const refreshToken = catchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Access token is retrived successfully!',
        data:result,
    });
});

const forgetPassword = catchAsync(async(req,res)=>{
    const userId = req.body.id;
    const result = await AuthService.forgetPassword(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link is generated successfully!',
        data: result,
      });
})


const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
    }
  
    const result = await AuthService.resetPassword(req.body, token);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password reset successfully!',
      data: result,
    });
  });
  
  export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
  };



