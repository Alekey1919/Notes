import ACTION_TYPES from "./ActionTypes";

export const addNote = (payload) => {
  return {
    type: ACTION_TYPES.ADD_NOTE,
    payload,
  };
};

export const deleteNote = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_NOTE,
    payload,
  };
};

export const clearStore = () => {
  return {
    type: ACTION_TYPES.CLEAR_STORE,
    payload: null,
  };
};

export const updateNote = (payload) => {
  return {
    type: ACTION_TYPES.UPDATE_NOTE,
    payload,
  };
};
