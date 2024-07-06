import httpStatus from "http-status";
import { hashedPassword } from "@/utils/hashedPassword";
import prisma from "@/server/prisma";
import ApiError from "@/server/ErrorHandelars/ApiError";
import { User } from "@prisma/client";
import { jwtHelpers } from "@/utils/jwtHelpers";

const create = async (data: User) => {
  const user = await prisma.user.findUnique({
    where: {
      username: data?.username,
    },
  });

  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const userPassword = await hashedPassword.createhas(data?.password);
  data.password = userPassword;

  const { password, ...response } = await prisma.user.create({ data });

  return {
    user: response,
  };
};

export const login = async (data: { username: string; password: string }) => {
  const { username, password } = data;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }

  if (!user?.isActive) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User block by admin");
  }

  const isPasswordCorrect = await hashedPassword.comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  await userControllers.updateOne(
    { ...user, lastVisit: new Date(Date.now()) },
    user?.id
  );

  const token = jwtHelpers.createToken(user, "24H");

  const { password: hidePassword, ...other } = user;
  return {
    user: other,
    token,
  };
};

const getLoginUser = async (token: string) => {
  if (!token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not permitted to perform this action"
    );
  }
  const tokenInfo = jwtHelpers.verifyToken(token);
  const user = await getUserById(tokenInfo.id);

  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not permitted to perform this action"
    );
  }
  return user;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const { password, ...other } = user;
  return other;
};

const findAll = async () => {
  const response = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      fullName: true,
      phone: true,
      isActive: true,
      lastVisit: true,

      createdAt: true,
      updatedAt: true,
    },
  });
  return response;
};

const deleteOne = async (id: string) => {
  const res = await prisma.user.delete({
    where: {
      id,
    },
  });

  return res;
};

const updateOne = async (data: User, id: string) => {
  const res = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return res;
};

const userControllers = {
  create,
  login,
  getLoginUser,
  findAll,
  deleteOne,
  updateOne,
};

export default userControllers;
