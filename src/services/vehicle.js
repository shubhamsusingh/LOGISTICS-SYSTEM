import axiosInstance from '@/utils/AxiosInterceptor';
export const vehicleList=async()=>{
    return axiosInstance.get('/vehicleList');
}
export const addVehicle=async(payload)=>{
    return axiosInstance.post('/addVehicle',payload);
}


export const updateVehicle = (data) => {
  return axiosInstance.post("/updateVehicle", data);
};

export const deleteVehicle = (id) => {
  return axiosInstance.delete(`/vehicle/${id}`);
};