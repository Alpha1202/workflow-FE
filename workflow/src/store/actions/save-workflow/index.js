import {
  SAVE_WORKFLOW_START,
  SAVE_WORKFLOW_SUCCESS,
  SAVE_WORKFLOW_FAIL,
  SAVE_WORKFLOW_CLEANUP,
  SAVE_TEMP_WORKFLOW,
} from "../../actionTypes";
import { API } from "../../../utils/Axios";

const saveWorkFlowStart = () => {
  return { type: SAVE_WORKFLOW_START };
};
const saveWorkFlowSucess = (payload, message) => {
  return { type: SAVE_WORKFLOW_SUCCESS, payload, message };
};
export const saveTempWorkFlow = (payload) => {
  return { type: SAVE_TEMP_WORKFLOW, payload };
};
const saveWorkFlowFail = (payload) => {
  return { type: SAVE_WORKFLOW_FAIL, payload };
};
export const saveWorkFlowCleanUp = () => {
  return { type: SAVE_WORKFLOW_CLEANUP };
};

export const saveWorkflowRequest = (payload) => {
  return async (dispatch) => {
    dispatch(saveWorkFlowStart());

    try {
      const callObj = {
        method: "PUT",
        path: `save`,
        data: payload,
      };

      const data = await API(callObj);

      if (data.status === "success") {
        dispatch(saveWorkFlowSucess(data, (data.message = "Successful")));

        return data;
      } else {
        dispatch(saveWorkFlowFail(data.data, (data.message = "Failed")));
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
      dispatch(saveWorkFlowFail([], errorResponse));
    }
  };
};
