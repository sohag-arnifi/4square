import Client, { IClient } from "@/models/client";
import ClientTransaction, { IClientTrans } from "@/models/clientTrans";
import mongoose from "mongoose";

const create = async (data: IClientTrans) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const clientTransaction = new ClientTransaction(data);
  const savedTransaction = await clientTransaction.save({ session });

  // const sevenDaysFromToday = new Date();
  // sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);
  const oneMonthFromToday = new Date();
  oneMonthFromToday.setMonth(oneMonthFromToday.getMonth() + 1);

  const clientId = data.paymentClient;
  const update = {
    isActive: true,
    expiryDate: oneMonthFromToday,
  };

  await Client.findByIdAndUpdate(clientId, update, { session });

  await session.commitTransaction();
  session.endSession();

  return savedTransaction.toObject();
};

const update = async (data: IClient) => {
  const id = data?._id;

  const response = await (
    await Client.findByIdAndUpdate(id, data, { new: true })
  )?.toObject();
  return response;
};

const deleteOne = async (data: IClient) => {
  const id = data?._id;

  const response = await await Client.findByIdAndDelete(id);
  return response;
};

const getAll = async () => {
  const response = await Client.find().sort({ customerId: -1 }).lean();

  const filteredData = response?.map((item: IClient) => {
    const expiryDate = new Date(item?.expiryDate).getTime();
    const toDay = new Date().getTime();

    if (item.isActive === true && item.isActive === toDay < expiryDate) {
      return { ...item, isActive: true };
    } else {
      return { ...item, isActive: false };
    }
  });

  return filteredData;
};

const clientTransControllers = {
  create,
};

export default clientTransControllers;
