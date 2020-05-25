import createDataContext from "./createDataContext";

const searchReducer = (state, action) => {
  switch (action.type) {
    case "get_result":
      return { ...state, resultList: action.payload, loading: false };
    case "set_error":
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
const setError = (dispatch) => {
  return (error) => {
    dispatch({ type: "set_error", payload: error });
  };
};
const getResults = (dispatch) => {
  return async (response) => {
    try {
      dispatch({ type: "get_result", payload: response.data.businesses });
      console.log(response.data.businesses.length);
    } catch (err) {}
  };
};

export const { Context, Provider } = createDataContext(
  searchReducer,
  { getResults, setError },
  { resultList: [], errorMessage: "", loading: true }
);
