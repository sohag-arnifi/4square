import { IBulkSMS } from "@/models/bulksms";
import bulksmsControllers from "@/server/controllers/bulksms";
import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    sendTo: null,
    sendBy: "corn_job",
    sendNumber: "01760567555",
    message: `corn job run at ${new Date().toLocaleString()}`,
    smsCount: 1,
  };
  try {
    const response = await bulksmsControllers.sendSingle(data as IBulkSMS);
    console.log(
      `corn jobs working successfully, at: ${new Date().toLocaleString()}`
    );

    console.log(response);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error, "Error");
  }
}
