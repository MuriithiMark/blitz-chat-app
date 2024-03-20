import axios from "axios";
import { SERVER_URL } from "./constants";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = SERVER_URL

export default axios