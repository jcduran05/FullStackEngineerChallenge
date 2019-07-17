import axios from "axios";
import history from "../history";
import { addFeedbackThunk } from "./feedback";

/**
 * ACTION TYPES
 */
const GET_REVIEWS = "GET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";

/**
 * INITIAL STATE
 */
const defaultReviews = {};

/**
 * ACTION CREATORS
 */
export const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
export const addReview = review => ({ type: ADD_REVIEW, review });

/**
 * THUNK CREATORS
 */
export const fetchReviews = () => async dispatch => {
  try {
    const res = await axios.get("/api/admin/reviews");
    return dispatch(getReviews(res.data || defaultAdmin.reviews));
  } catch (err) {
    console.error(err);
  }
};

export const submitReview = (submitObj, method) => async dispatch => {
  let res;
  let m = method.split(".");
  try {
    res = await axios.post(`/api/admin/${m[0]}/${m[1]}`, submitObj);
  } catch (err) {
    console.error(err);
  }

  try {
    dispatch(addReview(res.data[0]));
    dispatch(addFeedbackThunk(res.data[1]));
    history.push("/home");
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export const reviewReducer = (state = defaultReviews, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.review];
    default:
      return state;
  }
};
