import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import { Provider as SearchProvider } from "./src/context /SearchContext";
import DetailScreen from "./src/screens/DetailScreen";

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    Single: DetailScreen,
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "Restaurant Search ",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <SearchProvider>
      <App />
    </SearchProvider>
  );
};
