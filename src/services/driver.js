import axiosInstance from '@/utils/AxiosInterceptor';
export const freeDriver=async()=>{
    return axiosInstance.get('/getDriverList');
}