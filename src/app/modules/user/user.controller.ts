import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await UserService.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Create successfully",
    data: result,
  });
});
export const UserController = {
  createUser,
};
