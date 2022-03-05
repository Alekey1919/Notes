import { createStore } from "redux";
import notesReducer from "../Reducer/notesReducer";

const store = createStore(notesReducer);

export default store;
