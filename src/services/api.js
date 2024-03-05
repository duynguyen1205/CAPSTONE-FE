import axios from "../utils/axios-customize";
import qs from "query-string";

// gọi tất cả api ở đây

// get all user

export const getAllUser = () => {
  return axios.get("/api/user");
};

export const getAllCategory = () => {
  return axios.get("/api/category");
};
// đề tài sơ duyệt
export const getTopicReviewerAPI = (userId) => {
  return axios.get(`/api/topic/pre-topic-waiting-reviewer?memberId=${userId}`);
};

// upload file
export const uploadFile = (files) => {
  const bodyFormData = new FormData();
  bodyFormData.append("formFiles", files);
  return axios({
    method: "post",
    url: "/api/topic/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// create a new topic
export const createTopicAPI = (data) => {
  return axios({
    method: "post",
    url: "/api/topic/create",
    data: {...data},
    headers: {
      "Content-Type": "application/json",
    },
  });
};
//  get topic for dean
export const getTopicForDean = (param) => {
  return axios.get(`/api/topic/topic-for-dean?${qs.stringify(param)}`);
};

// dean make decision
export const createDeanMakeDecesion = (param) => {
  return axios.post("/api/topic/dean-make-decision", param);
};
