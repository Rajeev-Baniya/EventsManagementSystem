import http from "./httpService";

const apiChkVnuAvl = "/venue/availability/";

const tokenKey = "token";

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export const checkAvailabilty = async (values) => {
  http.setJwt(getJwt());

  const response = await http.get(`${apiChkVnuAvl}${values}`);
  //   console.log(response);

  return response;
};

const venue = { checkAvailabilty };
export default venue;
