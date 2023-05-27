import http from "./httpService";

const apiCreateEvent = "/events";

const tokenKey = "token";

export const createEvent = async (values) => {
  const response = await http.post(`${apiCreateEvent}`, values);
  return response;
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

const event = { createEvent };

export default event;
