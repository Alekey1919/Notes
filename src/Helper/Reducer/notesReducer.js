import ACTION_TYPES from "../Actions/ActionTypes";

const initialState = [];

const notesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.ADD_NOTE:
      return payload;
    case ACTION_TYPES.DELETE_NOTE:
      return state.filter((note) => note.id !== payload);
    case ACTION_TYPES.CLEAR_STORE:
      return [];
    case ACTION_TYPES.UPDATE_NOTE:
      const tempState = [...state];
      for (let note in state) {
        if (tempState[note].id === payload.id) {
          tempState[note] = payload;
        }
      }
      return tempState;
    default:
      return state;
  }
};

export default notesReducer;
