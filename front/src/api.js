import axios from "axios";
import applyCaseMiddleware from 'axios-case-converter';

const API = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3000/api/v1"
}));

export default API;