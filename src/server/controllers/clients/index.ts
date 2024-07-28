import Client, { IClient } from "@/models/client";
import { getCreateMessageTemplate } from "@/server/smsTemplates";
import bulksmsControllers from "../bulksms";
import { IBulkSMS } from "@/models/bulksms";

const create = async (data: IClient, createdBy: string) => {
  const message = getCreateMessageTemplate(data);
  const smsData = {
    sendBy: createdBy,
    sendNumber: data?.phone,
    message: message,
    smsCount: 2,
  };

  const response = await (await Client.create(data))?.toObject();
  await bulksmsControllers.sendSingle(smsData as IBulkSMS);
  return response;
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

const clientsControllers = {
  create,
  update,
  getAll,
  deleteOne,
};

export default clientsControllers;
