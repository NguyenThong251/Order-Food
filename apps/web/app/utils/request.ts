import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:4000/",
  // baseURL: "https://rest-api-w2vd.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
// export const get = async (path, options = {}) => {
//   const response = await request.get(path, options);
//   return response.data;
// };
export default request;
