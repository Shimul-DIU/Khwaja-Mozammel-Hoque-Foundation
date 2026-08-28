import axiosInstance from "@/lib/axios";

export const getCurrentUser = async (id: string) => {
  const response = await axiosInstance.get(
    `/api/devotee/singleDevotee/${id}`
  );

  return response.data;
};