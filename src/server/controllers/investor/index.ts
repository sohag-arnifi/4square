import Investor, { IInvestor } from "@/models/investor";

const create = async (data: IInvestor) => {
  const response = await Investor.create(data);
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
  const response = await Investor.find();

  return response;
};

const investorControllers = {
  create,
  update,
  getAll,
};

export default investorControllers;
