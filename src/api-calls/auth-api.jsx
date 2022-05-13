import axios from "axios";

export const signupHandler = async (email, password) => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      email: email,
      password: password,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data
    }
  } catch (error) {
    console.log(error);
    throw error
  }
};


export const loginHandler = async (email, password) => {
  try {
    const response = await axios.post(`/api/auth/login`, {
      email: email,
      password: password,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data
    }
  } catch (error) {
    console.log(error);
    throw error
  }
};
