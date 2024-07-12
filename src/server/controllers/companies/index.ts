import Company, { ICompany } from "@/models/company";

const create = async (data: ICompany) => {
  const response = await (await Company.create(data))?.toObject();
  return response;
};

const update = async (data: ICompany) => {
  const _id = data?._id;

  const response = await (
    await Company.findOneAndUpdate({ _id }, data, {
      new: true,
    })
  )?.toObject();

  return response;
};

const getOne = async () => {
  const response = await (await Company.findOne({}))?.toObject();
  return response;
};

const companiesControllers = {
  create,
  update,
  getOne,
};

export default companiesControllers;
