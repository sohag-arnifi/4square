import { IRole } from "@/models/user";
import ApiError from "@/server/ErrorHandelars/ApiError";
import clientTransControllers from "@/server/controllers/clientTransaction";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const user = req.user;

    if (
      !user?.username &&
      (user?.role !== IRole.SUPER_ADMIN || user?.role !== IRole.ADMIN)
    ) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await clientTransControllers.create({
      ...data,
      paymentBy: user?.username,
    });

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Packege actived Successfully",
      data: response,
    });
  }
);

export const GET = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const user = req.user;

    if (!user?.username) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    // const response = await clientsControllers.getAll();

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Clients Get Successfully",
      // data: response,
    });
  }
);
