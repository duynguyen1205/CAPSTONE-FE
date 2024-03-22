import axios from "../utils/axios-customize";
import qs from "query-string";

// gọi tất cả api ở đây

// get all user

export const getAllUser = () => {
  return axios.get("/api/user/all");
};

export const getAllCategory = () => {
  return axios.get("/api/category");
};
// đề tài sơ duyệt
export const getTopicReviewerAPI = (param) => {
  return axios.get(`/api/topic/pre-topic-waiting-reviewer?${qs.stringify(param)}`);
};
export const createMemberDecision = (param) => {
  return axios.post("/api/memberreview/make-decision", param);
};
// upload file return link and name
export const uploadFile = (files) => {
  const bodyFormData = new FormData();
  bodyFormData.append("formFiles", files);
  return axios({
    method: "post",
    url: "/api/uploadfile/multiple",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadFileSingle = (file) => {
  const bodyFormData = new FormData();
  bodyFormData.append("formFile", file);
  return axios({
    method: "post",
    url: "/api/uploadfile/single",
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
    data: { ...data },
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

//dean view history decision
export const viewDeanDecesion = (param) => {
  return axios.get(`api/topic/topic-decided-by-dean?${qs.stringify(param)}`);
};

// get topic waiting for member approval
export const getTopicForMemberApproval = (param) => {
  return axios.get(`/api/topic/pre-topic-waiting-review-formation?${qs.stringify(param)}`);
};

// MemberReview topic 
export const memberReviewAPI = (data) => {
  return axios.post("/api/memberreview/add-reviewer", data);
}

// get topic waiting for member approval
export const getTopicForCouncil = (param) => {
  return axios.get(`api/topic/early-topic-waiting-council-formation?${qs.stringify(param)}`);
};

//get topic member has already reviewed
export const getReviewedByMember = (param) => {
  return axios.get(`api/topic/topic-reviewed-for-member?${qs.stringify(param)}`);
};

// create council
export const councilConfig = (data) => {
  return axios.post("/api/review/config", data);
};

// getDetail topic
export const getTopicDetailAPI = (param) => {
  return axios.get(`/api/topic/detail?${qs.stringify(param)}`)
};

// get topic waiting for member review approval
export const getTopicWaitingMember = (param) => {
  return axios.get(`api/topic/pre-topic-waiting-review-for-staff?${qs.stringify(param)}`)
};

//get topic waiting for upload resullts after meeting 
export const getTopicUploadDoc = (param) => {
  return axios.get(`api/topic/early-topic-waiting-council-meetting?${qs.stringify(param)}`)
};

//get topic waiting for upload contract 

export const getTopicUploadContract = (param) => {
  return axios.get(`api/topic/early-topic-waiting-upload-contract?${qs.stringify(param)}`)
}

// upload contract result for topic
export const uploadResult = (data) => {
  return axios.post("/api/review/update-meeting-result", data);
};
// upload contract contract for topic
export const uploadContract = (data) => {
  return axios.post("/api/contract/upload-early-contract", data);
};

// track topic history
export const trackReseach = (param) => {
  return axios.get(`api/topic/process?${qs.stringify(param)}`)
}

// get topic by userId
export const getTopicByUserId = (param) => {
  return axios.get(`api/topic/topic-for-user?${qs.stringify(param)}`)
}

//  get topic for council meeting
export const getTopicForCouncilMeeting = (param) => {
  return axios.get(`/api/topic/early-topic-waiting-council-meeting-for-council?${qs.stringify(param)}`);
};

// get topic waiting for resubmit
export const getTopicWaitingResubmit = (param) => {
  return axios.get(`api/topic/early-topic-waiting-resubmit?${qs.stringify(param)}`)
};

// reset deadline for resubmit

export const setResubmitTime = (data) => {
  return axios.post("api/review/edit-deadline-for-early-review", data);
};

