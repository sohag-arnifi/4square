import { IClientTrans } from "@/models/clientTrans";

export const getPaymentMessageTemplate = (data: IClientTrans, expiry: Date) => {
  const expiryDate = new Date(expiry).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const template = `ইন্টারনেট বিলের ${data?.paymentAmount} টাকা পরিশোধিত হয়েছে, মেয়াদ: ${expiryDate}.\n\nজরুরি প্রয়োজনে: 01824-321066 (Alal)\n4-Square Cable Network`;

  return template;
};
