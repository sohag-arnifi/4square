import { MongooseError } from "mongoose";
import { IGenericErrorResponse } from ".";

const handleValidationError = (error: MongooseError): IGenericErrorResponse => {
  const errors = [
    {
      path: "",
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
