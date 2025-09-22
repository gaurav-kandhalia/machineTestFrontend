import apiClient from "./apiClient";


export const addAgent = (agentData) => {
  return apiClient.post('/admin/create-agent', agentData);
};

export const distributedList = (page = 1, limit = 10) => {
  return apiClient.get(`/admin/Items?page=${page}&limit=${limit}`, {
    withCredentials: true,
  });
};


export const uploadFile = (formData) => {
  return apiClient.post("/admin/uploadFile", formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};



export const distributeItems = (filePath) => {
  return apiClient.post(
    "/admin/distributeItems",
    { filePath }, 
    {
      withCredentials: true,
    }
  );
};
