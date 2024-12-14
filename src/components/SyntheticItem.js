import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useFontSize } from "./FontSizeContext";

const SyntheticItem = ({ name, image, symbols,minLotSize }) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const { fontSize } = useFontSize();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: theme.minorcolor }]}
      onPress={() =>
        navigation.navigate("CalculatorScreen", { name, image, symbols, minLotSize})
      } // Navigate to Screen.js and pass symbol and livedata
    >
      {/* Circular Image Container */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.itemText, { color: theme.color, fontSize }]}>
          {name}
        </Text>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    margin: 7,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  image: {
    width: "70%",
    height: "70%",

    resizeMode: "contain",
    alignItems: "center",
  },
  priceText: {
    fontWeight: "bold",
    marginRight: 5,
  },
  livedata: {
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  itemText: {
    fontWeight: "bold",
  },
});

export default SyntheticItem;
