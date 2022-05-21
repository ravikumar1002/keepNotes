import axios from "axios";
import { toast } from "react-toastify";

export const signupHandler = async (email, password) => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      email: email,
      password: password,
    });
    if (response.status === 200 || response.status === 201) {
      toast.success(`Sign In successful`);
      return response.data
    }
  } catch (error) {
    toast.error(error?.response?.data?.errors)
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
      toast.success(`Log In successful`);
      console.log(response)
      return response.data
    }
  } catch (error) {
    toast.error(error?.response?.data?.errors)
    console.log(error);
    throw error
  }
};
