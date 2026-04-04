import axiosInstance from '@/utils/AxiosInterceptor';
export const getDashboard=async()=>{
    return axiosInstance.get('/dashboard');
}