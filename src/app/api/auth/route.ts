import ApiError from "@/server/ErrorHandelars/ApiError";
import userControllers from "@/server/controllers/user";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const response = await userControllers.login(data);
    const { user, token } = response;

    cookies().set("token", token);
    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Login Successfully",
      data: user,
    });
  }
);

export const GET = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const user = req.user;

    if (!user?.id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Get Successfully",
      data: user,
    });
  }
);
