import axios from "axios";

/**
 * ACTION TYPES
 */
const GET_FEEDBACK = "GET_FEEDBACK";
const ADD_FEEDBACK = "ADD_FEEDBACK";
const UPDATE_FEEDBACK = "UPDATE_FEEDBACK";

/**
 * INITIAL STATE
 */
const defaultFeedback = {};

/**
 * ACTION CREATORS
 */
export const getFeedback = feedback => ({ type: GET_FEEDBACK, feedback });
export const addFeedback = feedback => ({ type: ADD_FEEDBACK, feedback });
export const updateFeedback = feedback => ({ type: UPDATE_FEEDBACK, feedback });

/**
 * THUNK CREATORS
 */
export const fetchFeedback = () => async dispatch => {
  try {
    const res = await axios.get("/api/admin/feedback");
    return dispatch(getFeedback(res.data || defaultFeedback));
  } catch (err) {
    console.error(err);
  }
};

export const addFeedbackThunk = feedbackArr => async dispatch => {
  try {
    dispatch(addFeedback(feedbackArr));
  } catch (err) {
    console.error(err);
  }
};

export const submitFeedback = (submitObj, method) => async dispatch => {
  let res;
  let m = method.split(".");
  try {
    res = await axios.post(`/api/admin/${m[0]}/${m[1]}`, submitObj);
  } catch (err) {
    console.error(err);
  }

  try {
    dispatch(updateFeedback(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const updateObjectInArray = (array, action) => {
  return array.map(item => {
    if (item.id !== action.id) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action
    };
  });
};

/**
 * REDUCER
 */
export const feedbackReducer = (state = defaultFeedback, action) => {
  switch (action.type) {
    case GET_FEEDBACK:
      return action.feedback;
    case ADD_FEEDBACK:
      return [...state, ...action.feedback];
    case UPDATE_FEEDBACK:
      return updateObjectInArray(state, action.feedback);
    default:
      return state;
  }
};
