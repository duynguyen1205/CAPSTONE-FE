import axios from "../utils/axios-customize";

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
  for (let i = 0 ; i < files.length ; i++) {
    bodyFormData.append("images", files[i]);
}
  // bodyFormData.append("formFiles", files);
  return axios({
    method: "post",
    url: "api/topic/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}