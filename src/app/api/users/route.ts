import { IRole, IUser } from "@/models/user";
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

    if (!user?._id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await userControllers.findAll();

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Users Get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    const data = await req.json();

    const response = await userControllers.updateOne(data, data._id);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Updated Successfully",
      data: response,
    });
  }
);

export const DELETE = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const user = req.user as IUser;

    if (user?.role !== IRole.SUPER_ADMIN && user.role !== IRole.ADMIN) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await userControllers.deleteOne(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Deleted Successfully",
      data: response,
    });
  }
);
