import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";

import { HeaderHeight } from "../constants/utils";
import yelp from "../api//yelp";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

const DetailScreen = ({ navigation }) => {
  const [singleresult, setSingleResult] = useState(null);
  const id = navigation.getParam("id");

  const getSingleResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setSingleResult(response.data);
  };
  useEffect(() => {
    getSingleResult(id);
  }, []);

  if (!singleresult) {
    return null;
  }
  console.log(singleresult.categories[0].title);
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={{ uri: singleresult.image_url }}
          style={styles.profileContainer}
          imageStyle={styles.profileImage}
        >
          <Block flex style={styles.profileDetails}>
            <Block style={styles.profileTexts}>
              <Text color="white" size={28} style={{ paddingBottom: 8 }}>
                {singleresult.name}
              </Text>
              <Block row>
                <Block row>
                  <Block row middle style={styles.pro}>
                    <Icon
                      name="star"
                      family="GalioExtra"
                      size={10}
                      style={{ color: "white" }}
                    />
                    <Text size={16} color="white">
                      {singleresult.rating}
                    </Text>
                  </Block>
                  <Text color="white" size={16} muted style={styles.seller}>
                    {singleresult.categories[0].title}
                  </Text>
                </Block>
              </Block>
            </Block>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
              style={styles.gradient}
            />
          </Block>
        </ImageBackground>
      </Block>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block row space="between" style={{ padding: theme.SIZES.BASE }}>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>
                {singleresult.review_count}
              </Text>
              <Text muted size={12}>
                Review Count
              </Text>
            </Block>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>
                <Icon
                  name="map-marker"
                  family="font-awesome"
                  color={theme.COLORS.Icon}
                  size={16}
                />
              </Text>
              <Text muted size={12}>
                {singleresult.location.city}
              </Text>
            </Block>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>
                Statut
              </Text>
              <Text muted size={12}>
                {singleresult.is_closed ? "Open" : "Closed"}
              </Text>
            </Block>
          </Block>
          <Block
            row
            space="between"
            style={{ paddingVertical: 16, alignItems: "baseline" }}
          >
            <Text size={16}>Photos</Text>
          </Block>
          <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
            <Block row space="between" style={{ flexWrap: "wrap" }}>
              {singleresult.photos.map((img, imgIndex) => (
                <Image
                  source={{ uri: img }}
                  key={`viewed-${img}`}
                  resizeMode="cover"
                  style={styles.thumb}
                />
              ))}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: "auto",
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "flex-end",
    position: "relative",
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2,
  },
  pro: {
    backgroundColor: "#FE2472",
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    position: "absolute",
  },
});

export default DetailScreen;
