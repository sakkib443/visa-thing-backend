import httpStatus from "http-status";
import { TUser } from "../User/user.interfase";
import { User } from "../User/user.model";
import { TUserLogin } from "./auth.interfase";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { accesstoken } from "./auth.utls";
import AppError from "../../errors/AppError";
import { error } from "console";

const register = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User alray exists");
  }
  payload.role = payload.role;
  const newUser = await User.create(payload);
  return newUser;
};

const loginUser = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByCustomId(payload.email);

  // const isUserExists = await User.findOne({ email: payload.email }).select(
  //   "password"
  // );
  // console.log(user);
  if (!user) {
    throw new Error("This User not found");
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new Error("wrong password !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = accesstoken(
    jwtPayload,
    config.jwt_access_token as string,
    "7d"
  );
  const token = `${accessToken}`;

  const accessRefreashToken = accesstoken(
    jwtPayload,
    config.jwt_refresh_token as string,
    "1y"
  );
  return {
    token,
    accessRefreashToken,
    user,
  };
};

export const AuthService = {
  register,
  loginUser,
};
