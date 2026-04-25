import axiosInstance from "@/utils/AxiosInterceptor";

// Add delivery location
export const addDeliveryLocationApi = async (payload) => {
  return axiosInstance.post("/add-locations", payload);
};

// Get delivery location list
export const getDeliveryLocationListApi = async () => {
  return axiosInstance.get("/delivary-location-list");
};
