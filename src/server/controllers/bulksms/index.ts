import BulkSMS, { IBulkSMS } from "@/models/bulksms";
import ApiError from "@/server/ErrorHandelars/ApiError";
import { sendOneToManySMS } from "@/server/helpers/smsApi";
import httpStatus from "http-status";

const sendSingle = async (data: IBulkSMS) => {
  const { sendBy, sendNumber, message } = data;

  const smsResponse = await sendOneToManySMS(sendNumber, message);

  if (smsResponse?.status !== 200) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }

  const response = await BulkSMS.create(data);
  return response;
};

const getAll = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const start = new Date(startDate);
  const end = new Date(endDate).setHours(23, 59, 59, 999);

  const response = await BulkSMS.find({
    createdAt: {
      $gte: start,
      $lte: end,
    },
  })
    .populate("sendBy")
    .sort({ createdAt: -1 });

  return response;
};

const bulksmsControllers = {
  sendSingle,
  getAll,
};

export default bulksmsControllers;
