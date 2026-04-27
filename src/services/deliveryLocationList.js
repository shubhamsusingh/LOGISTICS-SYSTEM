import axiosInstance from "@/utils/AxiosInterceptor";

// Add delivery location
export const addDeliveryLocationApi = async (payload) => {
  return axiosInstance.post("/add-locations", payload);
};

// Get delivery location list
export const getDeliveryLocationListApi = async () => {
  return axiosInstance.get("/delivary-location-list");
};

export const updateDeliveryLocationApi = async (payload) => {
  return axiosInstance.post("/update", payload);
};
export const deleteDeliveryLocationApi = async (id) => {
  return axiosInstance.delete(`/delete-locations/${id}`);
};
