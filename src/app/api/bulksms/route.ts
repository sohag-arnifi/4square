import { IRole } from "@/models/user";
import ApiError from "@/server/ErrorHandelars/ApiError";
import bulksmsControllers from "@/server/controllers/bulksms";
import investorControllers from "@/server/controllers/investor";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const user = req.user;

    if (
      !user?._id &&
      user?.role !== IRole.SUPER_ADMIN &&
      user?.role !== IRole.ADMIN
    ) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await bulksmsControllers.sendSingle({
      ...data,
      sendBy: user?.username,
    });

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "SMS Send Successfully",
      data: response,
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

    const response = await bulksmsControllers.getAll();

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Messages get Successfully",
      data: response,
    });
  }
);

export const PATCH = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const user = req.user;

    const data = await req.json();

    if (!user?.id) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await investorControllers.update(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Investor Update Successfully",
      data: response,
    });
  }
);
