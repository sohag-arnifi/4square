import BulkSMS, { IBulkSMS } from "@/models/bulksms";
import Investor, { IInvestor } from "@/models/investor";

const sendSingle = async (data: IBulkSMS) => {
  const response = await BulkSMS.create(data);
  return response;
};

const update = async (data: IInvestor) => {
  const id = data?._id;

  const response = await (
    await Investor.findByIdAndUpdate(id, data, { new: true })
  )?.toObject();
  return response;
};

const getAll = async () => {
  const response = await BulkSMS.find()
    .populate("sendBy")
    .sort({ createdAt: -1 });

  return response;
};

const bulksmsControllers = {
  sendSingle,
  getAll,
  update,
};

export default bulksmsControllers;
