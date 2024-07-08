import ApiError from "@/server/ErrorHandelars/ApiError";
import companiesControllers from "@/server/controllers/companies";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import { Role } from "@prisma/client";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const POST = catchAsync(
  async (req: CustomRequest, res: Response): Promise<NextResponse> => {
    const data = await req.json();
    const user = req.user;

    if (!user?.id && user?.role !== Role.super_admin) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You are not permitted to perform this action"
      );
    }

    const response = await companiesControllers.create(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Company Create Successfully",
      data: response,
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

    const response = await companiesControllers.getOne();

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Comapny Get Successfully",
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

    const response = await companiesControllers.update(data);

    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Comapny Update Successfully",
      data: response,
    });
  }
);
