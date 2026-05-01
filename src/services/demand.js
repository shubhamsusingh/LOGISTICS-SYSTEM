import axiosInstance from '@/utils/AxiosInterceptor';
export const getDemand=async()=>{
    return axiosInstance.get('/Delivery-demad');
}
export const addDemand=async(payload)=>{
    return axiosInstance.post('/add-demand',payload);
}