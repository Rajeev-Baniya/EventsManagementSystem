import http from "./httpService";

const apiEndpointLogin = "/auth/login";
const apiEndpointRegister = "/auth/register";

export const login = async (values) => {
  const response = await http.post(`${apiEndpointLogin}`, values);
  return response;
};

export const register = async (values) => {
  const response = await http.post(`${apiEndpointRegister}`, values);
  return response;
};

const auth = { login, register };

export default auth;
