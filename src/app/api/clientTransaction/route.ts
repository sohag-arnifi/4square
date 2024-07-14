import { IRole } from "@/models/user";
import ApiError from "@/server/ErrorHandelars/ApiError";
import clientTransControllers from "@/server/controllers/clientTransaction";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

const getPackageAmount = (servicePackage: string): number => {
  if (servicePackage === "10Mbps") {
    return 500;
  } else if (servicePackage === "15Mbps") {
    return 600;
  } else if (servicePackage === "20Mbps") {
    return 800;
  } else if (servicePackage === "25Mbps") {
    return 1000;
  } else if (servicePackage === "30Mbps") {
    return 1200;
  } else if (servicePackage === "40Mbps") {
    return 1500;
  } else {
    return 0;
  }
};

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

    const amount = getPackageAmount(data?.paymentPackage);

    if (amount === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Payment Package");
    }

    const response = await clientTransControllers.create({
      ...data,
      paymentAmount: amount,
      paymentBy: user?._id,
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
