import { combineReducers } from "redux";
import { chatroomsReducer } from "./Chatrooms/reducers/chatroomsReducer";
import { loginReducer } from "./Login/reducers/loginReducer";

const rootReducer = combineReducers({
    chatroomsReducer,
    loginReducer,
})

export default rootReducer