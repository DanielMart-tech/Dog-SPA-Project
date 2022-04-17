import { getAllDogs, getTempers } from "../services/dogs";
import { GETDOGS, GETTEMPERAMENTS, ERROR, SETPAGENUMBER } from "./constants";

export async function getDogs() {
  const dogs = await getAllDogs();
  return function (dispatch) {
    dispatch({ type: GETDOGS, payload: dogs });
  };
}

export function getFilteredDogs(filters) {
  return function (dispatch) {
    dispatch({ type: GETDOGS, payload: filters });
  };
}

export async function getTemperaments() {
  const temperaments = await getTempers();
  return function (dispatch) {
    dispatch({ type: GETTEMPERAMENTS, payload: temperaments });
  };
}

export function setPageNumber(page) {
  return function (dispatch) {
    dispatch({ type: SETPAGENUMBER, payload: page });
  };
}

export function error(message) {
  return function (dispatch) {
    dispatch({ type: ERROR, payload: message });
  };
}
