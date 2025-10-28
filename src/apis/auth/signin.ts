import { axiosInstance } from "../axios-instance";

export const postSignin = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const { data } = await axiosInstance.post("/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data;
};

export const postSignout = async () => {
  await axiosInstance.post("/logout");
};
