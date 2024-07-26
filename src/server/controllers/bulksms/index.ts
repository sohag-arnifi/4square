import { IBulkSMS } from "@/models/bulksms";
import Investor, { IInvestor } from "@/models/investor";

const sendSingle = async (data: IBulkSMS) => {
  console.log("send single sms");
  // const response = await Investor.create(data);
  // return response;
};

const update = async (data: IInvestor) => {
  const id = data?._id;

  const response = await (
    await Investor.findByIdAndUpdate(id, data, { new: true })
  )?.toObject();
  return response;
};

const getAll = async () => {
  const response = await Investor.find();

  return response;
};

const bulksmsControllers = {
  sendSingle,
  update,
  getAll,
};

export default bulksmsControllers;
