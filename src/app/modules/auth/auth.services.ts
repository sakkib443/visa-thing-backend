import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import { TLoginUser } from "./auth.interface";

import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";



const loginUser = async (payload:TLoginUser)=>{
// let userId ;
// userId =payload.id || payload.mobileNo
//   console.log(userId);
  
    const user = await User.isUserExist(payload.id, payload.mobileNo);



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
    const user =  await User.isUserExist(userData.userId);

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
    if(!(await User.isPasswordMatched(payload.oldPassword, user?.password))){
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



const refreshToken = async (token: string) => {
    // checking if the given token is valid
    const decoded = verifyToken(token, config.JWT_REFRESH_SECRET as string);
  
    const { userId, iat } = decoded;
  
    // checking if the user is exist
    const user = await User.isUserExist(userId);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }
  
    const jwtPayload = {
      userId: user.id,
      role: user.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.JWT_ACCESS_SECRET as string,
      config.JWT_ACCESS_EXPIRES_IN as string,
    );
  
    return {
      accessToken,
    };
  };


  
const forgetPassword = async (userId: string) => {
    // checking if the user is exist
    const user = await User.isUserExist(userId);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    const jwtPayload = {
      userId: user.id,
      role: user.role,
    };
  
    const resetToken = createToken(
      jwtPayload,
      config.JWT_ACCESS_SECRET as string,
      '10m',
    );
  
    const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;
  
    sendEmail(user.email, resetUILink);
  
    console.log(resetUILink);
  };
  
  const resetPassword = async (
    payload: { id: string; newPassword: string },
    token: string,
  ) => {
    // checking if the user is exist
    const user = await User.isUserExist(payload?.id);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
  
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;
  
    //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4
  
    if (payload.id !== decoded.userId) {
      console.log(payload.id, decoded.userId);
      throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
    }
  
    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bycrypt_salt_rounds),
    );
  
    await User.findOneAndUpdate(
      {
        id: decoded.userId,
        role: decoded.role,
      },
      {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
      },
    );
  };

export const AuthService = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}