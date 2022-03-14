import { combineReducers } from "redux";

import getWorkflow from "./get-workflow";
import saveWorkflow from "./save-workflow";

export default combineReducers({
  getWorkflow,
  saveWorkflow,
});
