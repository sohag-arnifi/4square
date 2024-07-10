// const create = async (data: Company) => {
//   const response = await prisma.company.create({ data });
//   return response;
// };

// const update = async (data: Company) => {
//   const id = data?.id;
//   const response = await prisma.company.update({
//     where: {
//       id,
//     },
//     data,
//   });
//   return response;
// };

// const getOne = async () => {
//   const response = await prisma.company.findFirst();
//   return response;
// };

// const companiesControllers = {
//   create,
//   update,
//   getOne,
// };

// export default companiesControllers;
