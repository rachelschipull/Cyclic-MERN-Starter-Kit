import axios from "axios";

// const URL = axios.create({
  // withCredentials: true,
// });

// This is the API service
// TODO: Replace these API calls and all the server endpoints to examples
// See server/routes/main.js to see where these routes connect to
class APIService {
  createExample(msg) {
    return axios.post(`http://localhost:2121/`, msg);
  }
  getAllExamples() {
    return axios.get("http://localhost:2121/");
  }
  getExampleById(id) {
    return axios.get(`http://localhost:2121/${id}`);
  }
  deleteExample(id) {
    return axios.delete(`http://localhost:2121/${id}`)
  }
  deleteAllExamples(groupId) {
    return axios.delete(`http://localhost:2121/deleteAllExamples/${groupId}`)
  }

}

export default new APIService();