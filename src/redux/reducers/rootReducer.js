import { combineReducers } from "redux";

import historyReducer from "./historyReducer";


rootReducer = combineReducers({
    history: historyReducer
})


export default rootReducer;