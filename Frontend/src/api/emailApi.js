import api from "./api";

export const getEmailLogs = async () => {
  const res = await api.get("/email/logs");
  return res.data;
};

export const resendEmail = async (emailData) => {
  const res = await api.post(`/email/${emailData.type}`, emailData);
  return res.data;
};