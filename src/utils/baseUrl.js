import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://evalution-system.onrender.com/api/v1",
});

export default customFetch;
