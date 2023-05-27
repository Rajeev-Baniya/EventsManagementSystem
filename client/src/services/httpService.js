import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";

const setJwt = (jwt) => {
  const newJwt = jwt.replaceAll('"', "");
  axios.defaults.headers.common["Authorization"] = `Bearer ${newJwt}`;
  console.log(axios.defaults.headers);
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
