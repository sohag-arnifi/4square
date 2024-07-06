import { Company, Role, User } from "@prisma/client";
import prisma from "../prisma";
import ApiError from "../ErrorHandelars/ApiError";
import httpStatus from "http-status";
import { hashedPassword } from "@/utils/hashedPassword";

export const createCompany = async (companyInfo: Company, adminInfo: User) => {
  const isCompanuExists = await prisma.company.findFirst();

  if (isCompanuExists) {
    throw new ApiError(httpStatus.CONFLICT, "Company already exists");
  }

  const response = await prisma.$transaction(async (prismaClient) => {
    const company = await prismaClient.company.create({
      data: {
        ...companyInfo,
      },
    });

    const password = await hashedPassword.createhas(adminInfo.password);
    const companyAdmin = {
      username: adminInfo.username,
      fullName: adminInfo.fullName,
      email: "admistrator@erp.com",
      password,
      companyId: company.id,
      role: Role.super_admin,
    };

    await prismaClient.user.create({
      data: {
        ...companyAdmin,
      },
    });

    return company;
  });

  return response;
};

export const getCompanyInfo = async () => {
  const response = await prisma.company.findFirst();
  return response;
};
