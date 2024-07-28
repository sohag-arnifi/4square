import Client, { IClient } from "@/models/client";
import ClientTransaction, { IClientTrans } from "@/models/clientTrans";
import { getPaymentMessageTemplate } from "@/server/smsTemplates";
import mongoose from "mongoose";
import bulksmsControllers from "../bulksms";
import { IBulkSMS } from "@/models/bulksms";

const create = async (data: IClientTrans) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const clientTransaction = new ClientTransaction(data);
  const savedTransaction = await clientTransaction.save({ session });

  const oneMonthFromToday = new Date();
  oneMonthFromToday.setMonth(oneMonthFromToday.getMonth() + 1);

  const clientId = data.paymentClient;
  const update = {
    isActive: true,
    expiryDate: oneMonthFromToday,
  };

  const clientResponse = await Client.findByIdAndUpdate(clientId, update, {
    session,
    new: true,
  }).exec();

  await session.commitTransaction();
  session.endSession();

  const template = getPaymentMessageTemplate(data, oneMonthFromToday);

  const smsData = {
    sendBy: data?.paymentBy,
    sendNumber: clientResponse?.phone,
    message: template,
    smsCount: 1,
  };

  await bulksmsControllers.sendSingle(smsData as IBulkSMS);

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
