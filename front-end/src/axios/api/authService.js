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

  export const getAwsServiceData = async (type, roleArn) => {
    let endpoint = "";
  
    switch (type.toLowerCase()) {
      case "ec2":
        endpoint = `/api/aws/ec2?roleArn=${encodeURIComponent(roleArn)}`;
        break;
      case "rds":
        endpoint = `/api/aws/rds?roleArn=${encodeURIComponent(roleArn)}`;
        break;
      case "asg":
        endpoint = `/api/aws/asg?roleArn=${encodeURIComponent(roleArn)}`;
        break;
      default:
        throw new Error("Invalid AWS service type");
    }
  
    return await api.get(endpoint);
  };
  