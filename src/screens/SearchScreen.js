import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";
import { Context as SearchContext } from "../context /SearchContext";

const { width, height } = Dimensions.get("screen");

const SearchScreen = () => {
  const [term, setTerm] = useState("Pizza");
  const [city, setCity] = useState("New York");
  const [searchApi] = useResults();

  const {
    state: { resultList, loading },
  } = useContext(SearchContext);

  const filterResultsByRating = (min, max) => {
    return resultList.filter((result) => {
      return result.review_count >= min && result.review_count <= max;
    });
  };

  useEffect(() => {
    searchApi(term, city);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onChangeTerm={(newTerm) => {
          setTerm(newTerm);
        }}
        onSubmitTerm={() => {
          searchApi(term, city);
        }}
        city={city}
        onCityChange={(newcity) => {
          setCity(newcity);
          searchApi(term, newcity);
        }}
      />

      <ScrollView>
        <ResultsList
          results={filterResultsByRating(1825, 10000)}
          title="Cost Effective"
        />
        <ResultsList
          results={filterResultsByRating(582, 1825)}
          title="Big Pricer"
        />
        <ResultsList
          results={filterResultsByRating(0, 582)}
          title="Big Spender"
        />
        <ActivityIndicator
          animating={loading}
          size="large"
          style={styles.loading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  loading: {
    position: "relative",
    top: height / 3.3,
  },
});
export default SearchScreen;
