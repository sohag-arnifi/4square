import envConfig from "@/configs/envConfig";
import { NextResponse } from "next/server";
import ApiError from "./ApiError";
import { Prisma } from "@prisma/client";
import handleValidationError from "./handleValidationError";
import handleClientError from "./handleClientError";

export interface IGenericErrorMessage {
  path: string | number;
  message: string;
}

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
}

const errorHandler = (error: Error) => {
  envConfig.environment === "development" &&
    console.log(`🐱‍🏍 errorHandler ~~`, error);

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  return NextResponse.json({
    success: false,
    statusCode,
    message,
    errorMessages: errorMessages || null,
    stack: envConfig.environment === "development" ? error?.stack : null,
  });
};

export default errorHandler;
