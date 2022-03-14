import {
  GET_WORKFLOW_START,
  GET_WORKFLOW_SUCCESS,
  GET_WORKFLOW_FAIL,
  GET_WORKFLOW_CLEANUP,
} from "../../actionTypes";

import { getWorkflow } from "../../initialState";

const getWorkFlowReducer = (state = getWorkflow, action) => {
  switch (action.type) {
    case GET_WORKFLOW_START:
      return { ...state, isLoading: true };
    case GET_WORKFLOW_SUCCESS:
      return {
        ...state,
        workflow: action.payload,
        isLoading: false,
        isSuccessful: true,
        message: action.message,
      };
    case GET_WORKFLOW_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSuccessful: false,
        message: action.message,
      };
    case GET_WORKFLOW_CLEANUP:
      return { ...state, error: null, isLoading: false, isSuccessful: false };
    default:
      return state;
  }
};

export default getWorkFlowReducer;
