import api from "./appClient";

export const loginUser = (loginData) => {
  return api.post('/auth/login', loginData); 
};

export const getCurrentUser = async () => {
  return  api.get('/api/users/current-user'); 
}

export const logoutUser = () => {
    return api.post('/auth/logout'); 
  };

  export const getAllUsers = () => {
    return api.get('/api/users'); 
  };

  export const createUser = async (userData) => {
    return await api.post('/api/users', userData); 
  };

  export const getAllAccounts = async () =>{
    return api.get('/api/accounts')
  }

  export const getUserById = async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  };
  
  export const updateUser = async (id, data) => {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data;
  };

  export const addAccount = (formData) => {
    return api.post('/api/accounts', formData); 
  };