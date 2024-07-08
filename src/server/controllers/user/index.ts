import httpStatus from "http-status";
import { hashedPassword } from "@/utils/hashedPassword";
import ApiError from "@/server/ErrorHandelars/ApiError";
import { jwtHelpers } from "@/utils/jwtHelpers";
import User, { IUser } from "@/models/user";

const create = async (data: IUser) => {
  const user = await User.findOne({ username: data?.username });

  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const userPassword = await hashedPassword.createhas(data?.password);
  data.password = userPassword;

  const { password, ...response } = await User.create(data);

  return {
    user: response,
  };
};

export const login = async (data: { username: string; password: string }) => {
  const { username, password } = data;

  const user = await (await User.findOne({ username }))?.toObject();

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
  const user = await getUserById(tokenInfo._id);

  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not permitted to perform this action"
    );
  }
  return user;
};

const getUserById = async (id: string) => {
  const user = await (await User.findById(id))?.toObject();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const { password, ...other } = user;
  return other;
};

const findAll = async () => {
  const response = await User.find();
  return response;
};

const deleteOne = async (id: string) => {
  const response = await (await User.findByIdAndDelete(id))?.toObject();
  return response;
};

const updateOne = async (data: Partial<IUser>, id: string) => {
  const response = await (
    await User.findByIdAndUpdate(id, data, { new: true })
  )?.toObject();
  return response;
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
