import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import { TLoginUser } from "./auth.interface";

import config from "../../config";
import { createToken } from "./auth.utils";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";



const loginUser = async (payload:TLoginUser)=>{

    console.log(payload);
    
    
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


const changePassword = async(
    userData:JwtPayload,
    payload:{oldPassword:string; newPassword:string},
)=>{
    // check the user exits 
    const user =  await User.isUserExist(userData.userId,userData.mobileNo);

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,"This user not found!");
    }

    //checking user deleted
    const isDeleted = user?.isDeleted;
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,"This user is Deleted!");
    }

    const userStatus = user?.status;

    if(userStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN,"This user is blocked")
    }

    //checking if the password is correct
    if(!(await User.isPasswordMatch(payload.oldPassword, user?.password))){
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }

    //hash new password

    const newHasdedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bycrypt_salt_rounds),
    );

    await User.findOneAndUpdate(
        {
            id:userData.userId,
            role:userData.role, 
        },
        {
            password: newHasdedPassword,
            needsPasswordChange:false,
            passwordChangeAt:new Date(),    
        },
    );

    return null;

};


const refreshToken = async (token: string)=>{
    
}


export const AuthService = {
    loginUser,
    changePassword,

}