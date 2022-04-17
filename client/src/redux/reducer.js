import { GETDOGS, GETTEMPERAMENTS, ERROR, SETPAGENUMBER } from "./constants";

const initialState = {
  dogs: [],
  temperaments: [],
  pageNumber: 0,
  error: "",
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GETDOGS:
      return {
        ...state,
        dogs: payload,
      };
    case GETTEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };
    case SETPAGENUMBER:
      return {
        ...state,
        pageNumber: payload,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}

export default reducer;
