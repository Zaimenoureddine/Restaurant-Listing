import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const ResultDetail = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={{ uri: result.image_url }} />
      <Text style={styles.nameStyle}>{result.name}</Text>
      <Text>
        {result.rating} Star , {result.review_count} Reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    width: 220,
  },
  imageStyle: {
    height: 150,
    width: 220,
    borderRadius: 2,
    marginBottom: 5,
  },
  nameStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ResultDetail;
