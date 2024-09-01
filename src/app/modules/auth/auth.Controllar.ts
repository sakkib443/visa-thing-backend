import httpStatus from "http-status";

import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.Service";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const userLogin = catchAsync(async (req, res) => {
  const { accessRefreashToken, token, user } = await AuthService.loginUser(
    req.body
  );

  res.cookie("refreshToken", accessRefreashToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: { user, token },
  });
});

export const AuthControllers = {
  registerUser,
  userLogin,
};
