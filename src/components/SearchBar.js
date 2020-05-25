import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { FontAwesome } from "@expo/vector-icons";

const SearchBar = ({
  term,
  onChangeTerm,
  onSubmitTerm,
  onCityChange,
  city,
}) => {
  const cities = ["Milan", "Paris", "New York", "London"];
  return (
    <View style={styles.container}>
      <FontAwesome name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        style={styles.textInput}
        value={term}
        onChangeText={onChangeTerm}
        onEndEditing={onSubmitTerm}
      />
      <ModalDropdown
        options={cities}
        style={[styles.qty]}
        defaultValue="City"
        dropdownStyle={styles.dropdown}
        onSelect={(index, value) => {
          onCityChange(value);
        }}
        dropdownTextStyle={{ paddingLeft: 10, fontSize: 16 }}
      >
        <View style={{ flexDirection: "row", paddingRight: 10 }}>
          <Text style={{ flex: 2, alignSelf: "center", fontSize: 18 }}>
            {city}
          </Text>

          <FontAwesome
            name="map-pin"
            size={28}
            style={{ alignSelf: "center" }}
          />
        </View>
      </ModalDropdown>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#F0EEEE",
    borderRadius: 7,
    marginHorizontal: 15,
    marginVertical: 15,
    flexDirection: "row",
  },
  textInput: {
    flex: 2,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 12,
  },
  qty: {
    alignSelf: "center",
    fontSize: 20,
    flex: 1,
  },
  dropdown: {
    marginTop: 8,
    marginLeft: -16,
    width: 100,
  },
});
export default SearchBar;
