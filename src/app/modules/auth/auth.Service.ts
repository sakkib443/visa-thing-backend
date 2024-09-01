import httpStatus from "http-status";

import AppError from "../../errors/AppError";

import config from "../../config";
import { TUserLogin } from "./auth.interfase";
import { accesstoken } from "./auth.utls";
import { TUser } from "../User/user.interfase";
import { User } from "../User/user.model";

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

  if (!user) {
    throw new AppError(httpStatus.NOT_EXTENDED, "This User not found");
  }
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "wrong password !");
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
