import { cookies } from "next/headers";
import errorHandler from "../ErrorHandelars";
import userControllers from "../controllers/user";
import dbConnection from "@/lib/dbConnect";
import { IUser } from "@/models/user";
import ApiError from "../ErrorHandelars/ApiError";

export interface CustomRequest extends Request {
  user?: Partial<IUser>;
}

const catchAsync =
  (handler: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response) => {
    const tokenInfo = cookies().get("token")?.value;
    const methode = req.method;
    const pathName = req?.url.split("/api")[1];

    await dbConnection();

    try {
      if (
        (pathName === "/auth" || pathName === "/auth/create") &&
        methode === "POST"
      ) {
        return await handler(req, res);
      } else {
        const userInfo = await userControllers?.getLoginUser(
          tokenInfo as string
        );

        if (userInfo?._id) {
          (req as CustomRequest).user = userInfo;
        } else {
          throw new ApiError(401, "Unauthorized");
          // (req as CustomRequest).user = {};
        }
        return await handler(req, res);
      }
    } catch (error) {
      return errorHandler(error as Error);
    }
  };

export default catchAsync;
