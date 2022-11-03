import axios from "axios";

export const fetchCustom = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});
