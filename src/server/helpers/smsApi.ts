"use server";
import envConfig from "@/configs/envConfig";

export const sendOneToManySMS = async (sendTo: string, message: string) => {
  const response = await fetch(envConfig.sms_url as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: envConfig.sms_api_key,
      senderid: envConfig?.sms_sender_id,
      number: sendTo,
      message: message,
    }),
  });
  return response;

  // return { status: 200 };
};
