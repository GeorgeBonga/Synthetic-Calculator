import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useFontSize } from "./FontSizeContext";
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';

// Synthetic instruments data with names, symbols, and images
const syntheticInstrumentsData = [
  { name: "Volatility 10 Index", symbol: "R_10", image: require("../../assets/Derived/MarketDerivedVolatility10.png") },
  { name: "Volatility 25 Index", symbol: "R_25", image: require("../../assets/Derived/MarketDerivedVolatility25.png") },
  { name: "Volatility 50 Index", symbol: "R_50", image: require("../../assets/Derived/MarketDerivedVolatility50.png") },
  { name: "Volatility 75 Index", symbol: "R_75", image: require("../../assets/Derived/MarketDerivedVolatility75.png") },
  { name: "Volatility 100 Index", symbol: "R_100", image: require("../../assets/Derived/MarketDerivedVolatility100.png") },
  { name: "Volatility 10 (1s) Index", symbol: "1HZ10V", image: require("../../assets/Derived/MarketDerivedVolatility101s.png") },
  { name: "Volatility 25 (1s) Index", symbol: "1HZ25V", image: require("../../assets/Derived/MarketDerivedVolatility251s.png") },
  { name: "Volatility 50 (1s) Index", symbol: "1HZ50V", image: require("../../assets/Derived/MarketDerivedVolatility501s.png") },
  { name: "Volatility 75 (1s) Index", symbol: "1HZ75V", image: require("../../assets/Derived/MarketDerivedVolatility751s.png") },
  { name: "Volatility 100 (1s) Index", symbol: "1HZ100V", image: require("../../assets/Derived/MarketDerivedVolatility1001s.png") },
];

// WebSocket and API setup
const app_id = 1089; // Replace with your app_id if needed.
const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
const api = new DerivAPIBasic({ connection });

const SyntheticListdata = () => {
  const [tickData, setTickData] = useState({});
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  // Fetch live tick data from Deriv API
  const tickStream = (symbol) => api.subscribe({ ticks: symbol });

  const tickResponse = async (res) => {
    const data = JSON.parse(res.data);
    if (data.error !== undefined) {
      console.log('Error : ', data.error.message);
      connection.removeEventListener('message', tickResponse, false);
      await api.disconnect();
    }
    if (data.msg_type === 'tick') {
      setTickData((prevData) => ({
        ...prevData,
        [data.tick.symbol]: data.tick, // Update tick data for the specific symbol
      }));
    }
  };

  useEffect(() => {
    syntheticInstrumentsData.forEach(instrument => {
      tickStream(instrument.symbol);
    });
    connection.addEventListener('message', tickResponse);

    return () => {
      connection.removeEventListener('message', tickResponse);
      api.disconnect();
    };
  }, []);

  // Font size context
  const { fontSize } = useFontSize();

  return (
    <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme.background }]}>
      {syntheticInstrumentsData.map((instrument, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.itemContainer, { backgroundColor: theme.minorcolor }]}
          onPress={() => navigation.navigate("CalculatorScreen", { name: instrument.name })}
        >
          {/* Circular Image Container */}
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={instrument.image} />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.itemText, { color: theme.color, fontSize }]}>
              {instrument.name}
            </Text>
          </View>

          {/* Display live data or fallback to "No data" */}
          <Text style={[styles.livedata, { color: theme.color }]}>
            {tickData[instrument.symbol] ? `Price: ${tickData[instrument.symbol].quote}` : "No live data"}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10, // Rounded corners for the entire item
    margin: 7, // Add some margin for spacing between items
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half the width/height to make it a circle
    overflow: "hidden", // Ensure the image fits inside the circle
    justifyContent: "center",
    alignItems: "center", // Center the image
    margin: 5,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "70%",
    height: "70%",
    resizeMode: "cover", // Ensure the image covers the container
  },
  livedata: {
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontWeight: "bold",
  },
});

export default SyntheticListdata;
