import {
  GET_WORKFLOW_START,
  GET_WORKFLOW_SUCCESS,
  GET_WORKFLOW_FAIL,
  GET_WORKFLOW_CLEANUP,
} from "../../actionTypes";
import { API } from "../../../utils/Axios";

const getWorkflowStart = () => {
  return { type: GET_WORKFLOW_START };
};
const getWorkflowSucess = (payload, message) => {
  return { type: GET_WORKFLOW_SUCCESS, payload, message };
};
const getWorkflowFail = (payload) => {
  return { type: GET_WORKFLOW_FAIL, payload };
};
export const getWorkflowCleanUp = () => {
  return { type: GET_WORKFLOW_CLEANUP };
};

export const getWorkflowRequest = () => {
  return async (dispatch) => {
    dispatch(getWorkflowStart());

    try {
      const callObj = {
        method: "GET",
        path: `workflow`,
        data: null,
      };

      const data = await API(callObj);
      if (data.status) {
        dispatch(getWorkflowSucess(data.data, data.message));
        return data.data;
      } else {
        dispatch(getWorkflowFail(data.data, data.message));
      }
    } catch (e) {
      const error = e?.response?.data?.error;
      let errorResponse;
      if (error) {
        const errorResponses = Object.values(error.errors);
        errorResponse = errorResponses.reduce((acc, i) => acc.concat(i), []);
      } else {
        errorResponse = ["Something went wrong. please try again"];
      }
      dispatch(getWorkflowFail([], errorResponse));
    }
  };
};
