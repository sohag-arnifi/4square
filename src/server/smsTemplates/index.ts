import { IClient } from "@/models/client";
import { IClientTrans } from "@/models/clientTrans";

export const getPaymentMessageTemplate = (data: IClientTrans, expiry: Date) => {
  const expiryDate = new Date(expiry).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const template = `ইন্টারনেট বিলের ${data?.paymentAmount} টাকা পরিশোধিত হয়েছে, মেয়াদ: ${expiryDate}.\n\nজরুরি প্রয়োজনে যোগাযোগ করুন: ০১৮২৪-৩২১০৬৬ (আলাল)\n4-Square Cable Network`;

  return template;
};

export const getCreateMessageTemplate = (data: IClient) => {
  const template = `আপনার ${data?.servicePackege} ইন্টারনেট প্যাকেজের জন্য লগইন পোর্টাল তৈরি করা হয়েছে।\n\nLogin ID: ${data?.loginId}\nPassword: ${data?.loginPassword}\nপ্যাকেজটি সক্রিয় করতে ${data?.serviceCharge}Tk পেমেন্ট সম্পন্ন করুন।\n\nজরুরি প্রয়োজনে যোগাযোগ করুন: ০১৮২৪-৩২১০৬৬ (আলাল)\n4-Square Cable Network`;

  return template;
};
