import httpStatus from "http-status";

import { TLoginUser } from "./auth.interface";

import config from "../../config";
import { createToken } from "./auth.utils";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";



const loginUser = async (payload:TLoginUser)=>{

    
    
    const user = await User.isUserExist(payload.id,payload.mobileNo);


    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'This user is not found!');
    }

    
    const isDeleted = user?.isDeleted;
   
    
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,'This user is deleted');
    }


 // checking if the user is blocked

 const userStatus = user?.status;

 if (userStatus === 'blocked') {
   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
 }


//check passwrod is correct

if(!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN,'Password do not matched');


//create token and sent to the client

const jwtPayload ={
    userId: user.id,
    role:user.role,
}

const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
)

const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
);

return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
};

};


// const changePassword = async(

// )


export const AuthService = {
    loginUser,
}