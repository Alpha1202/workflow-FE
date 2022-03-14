import { 
  SAVE_WORKFLOW_START,
  SAVE_WORKFLOW_SUCCESS,
  SAVE_WORKFLOW_FAIL,
  SAVE_WORKFLOW_CLEANUP,
  SAVE_TEMP_WORKFLOW
 } from '../../actionTypes';

import { saveWorkflow } from '../../initialState';

const saveWorkflowReducer = (state = saveWorkflow, action) => {
  switch (action.type) {
    case SAVE_WORKFLOW_START:
      return { ...state, isLoading: true };
    case SAVE_WORKFLOW_SUCCESS:
      return { ...state, isLoading: false, isSuccessful: true, message: action.message };
    case SAVE_TEMP_WORKFLOW:
      return { ...state, tempWorkflow: action.payload };
    case SAVE_WORKFLOW_FAIL:
      return { ...state, error: action.payload, isLoading: false, message: action.message};
    case SAVE_WORKFLOW_CLEANUP:
      return { ...state, error: null, isLoading: false, isSuccessful: false };
    default:
      return state;
  }
};

export default saveWorkflowReducer;