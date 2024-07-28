import ApiError from "@/server/ErrorHandelars/ApiError";
import investorControllers from "@/server/controllers/investor";
import catchAsync, { CustomRequest } from "@/server/helpers/catchAsync";
import sendResponse from "@/server/helpers/sendResponse";
import httpStatus from "http-status";
import { NextResponse } from "next/server";

export const GET = catchAsync(
  async (req: Request, res: Response): Promise<NextResponse> => {
    console.log("corn job working successfully");
    return await sendResponse({
      statusCode: httpStatus.OK,
      success: true,
      message: "Message Send Successfully",
      // data: response,
    });
  }
);
