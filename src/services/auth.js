import axiosInstance from '@/utils/AxiosInterceptor';

export const loginApi = async (payload) => {
  return axiosInstance.post('/login', payload);
};

// export const getPermissionsApi = async (id) => {
//   return axiosInstance.get(`permission/${id}`);
// };

export const registerApi = async (payload) => {
  return axiosInstance.post('/register', payload);
};