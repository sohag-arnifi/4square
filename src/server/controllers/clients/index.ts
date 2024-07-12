import Client, { IClient } from "@/models/client";

const create = async (data: IClient) => {
  const response = await (await Client.create(data))?.toObject();
  return response;
};

const update = async (data: IClient) => {
  const id = data?._id;

  const response = await (
    await Client.findByIdAndUpdate(id, data, { new: true })
  )?.toObject();
  return response;
};

const getAll = async () => {
  const response = await Client.find().sort({ createdAt: -1 }).lean();

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
};

export default clientsControllers;
