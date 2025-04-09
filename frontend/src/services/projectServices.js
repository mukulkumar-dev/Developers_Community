import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/projects/create";

export const createProject = async (projectData) => {
  try {
    console.log(projectData);
    const response = await axios.post(API_BASE_URL, projectData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("response",response);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error in createProject API:", {
      data: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
