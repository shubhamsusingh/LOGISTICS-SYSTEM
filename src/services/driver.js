import axiosInstance from '@/utils/AxiosInterceptor';
export const freeDriver=async()=>{
    return axiosInstance.get('/getDriverList');
}
export const driverDashboard=async()=>{
    return axiosInstance.get('/driver/driver-dashboard');
}