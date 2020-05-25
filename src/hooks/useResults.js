import { useContext } from "react";
import yelp from "../api/yelp";
import { Context } from "../context /SearchContext";

export default () => {
  const { setError, getResults } = useContext(Context);
  const searchApi = async (searchTerm, city) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: city,
        },
      });
      getResults(response);
    } catch (error) {
      setError(error);
    }
  };

  return [searchApi];
};
