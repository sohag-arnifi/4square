import dbConnection from "@/lib/dbConnect";
import { IBulkSMS } from "@/models/bulksms";
import bulksmsControllers from "@/server/controllers/bulksms";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnection();
    const data = {
      sendBy: "auto",
      sendNumber: "01760567555",
      message: `corn job run at ${new Date().toLocaleString()}`,
      smsCount: 1,
    };

    await bulksmsControllers.sendSingle(data as IBulkSMS);

    console.log(
      `corn jobs working successfully, at: ${new Date().toLocaleString()}`
    );

    return NextResponse.json({ message: "sms send successfully" });
  } catch (error) {
    console.log(error, "Error");
  }
};
