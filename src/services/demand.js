import axiosInstance from '@/utils/AxiosInterceptor';
export const getDemand=async()=>{
    return axiosInstance.get('/Delivery-demad');
}