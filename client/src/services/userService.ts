import axiosInstance from "@/lib/axios";

export const getCurrentUser = async (id: string) => {
  const response = await axiosInstance.get(
    `/api/singleUser/${id}`
  );

  return response.data;
};