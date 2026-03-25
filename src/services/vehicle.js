import axiosInstance from '@/utils/AxiosInterceptor';
export const vehicleList=async()=>{
    return axiosInstance.get('/vehicleList');
}
