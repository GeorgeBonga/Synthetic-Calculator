import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import {
  Platform,
  ToastAndroid,
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { Provider } from "react-native-paper";
import { ThemeContext } from "../theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFontSize } from "../components/FontSizeContext";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";

// WebSocket and API setup
const app_id = 1089;
const connection = new WebSocket(
  `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic({ connection });

const CalculatorScreen = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [takeProfitPrice,setTakePrifitPrice] = useState("");
  const [riskPercentage, setRiskPercentage] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [riskAmount, setRiskAmount] = useState("");
  const [rewardAmount ,setRewardAmount] = useState("");
  const [warningMessage, setWarningMessage] = useState(""); // Warning message state
  const [showResult, setShowResult] = useState(false); // Track whether the result is calculated
  const [riskToReward,setRiskToReward] =useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { fontSize } = useFontSize();
  const { name, symbols, minLotSize } = route.params; // Get the name and symbol from route params
  const [price, setPrice] = useState("No live data");
  const [isLoading, setIsLoading] = useState(true);
  // Function to subscribe to tick data for the selected symbol
  const tickStream = (symbols) => api.subscribe({ ticks: symbols });

  const [isBuy, setIsBuy] = useState(true);

  const handleToggle = () => {
    setIsBuy(!isBuy);
  };

  const tickResponse = async (res) => {
    const data = JSON.parse(res.data);
    if (data.msg_type === "tick" && data.tick.symbol === symbols) {
      setPrice(data.tick.quote); // Update the live price only for the correct symbol
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPrice(""); // Reset the price to an empty string

    tickStream(symbols); // Start the subscription
    connection.addEventListener("message", tickResponse);

    // Set a timeout for 5 seconds to display "No live data"
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setPrice("No live data");
        setIsLoading(false); // Stop loading spinner
      }
    }, 3000);

    return () => {
      // Clean up the event listener and unsubscribe from the symbol
      connection.removeEventListener("message", tickResponse);
      //api.disconnect({ ticks: symbols }); // Unsubscribe from the symbol

      console.log("Interval ID:", timeoutId);

      if (timeoutId) {
        clearInterval(timeoutId);
        tickStream();
      }
    };
  }, [symbols]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // const calculateResults = () => {
  //   if (!stakeAmount || !entryPrice || !stopLossPrice || !riskPercentage || !takeProfitPrice) {
  //     setWarningMessage("All fields are required.");
  //     resetCalculator();

  //     // Set timeout to clear the warning message after 5 seconds
  //     setTimeout(() => {
  //       setWarningMessage("");
  //     }, 9000);

  //     return;
  //   }

  //   const stake = parseFloat(stakeAmount);
  //   const entry = parseFloat(entryPrice);
  //   const stop = parseFloat(stopLossPrice);
  //   const riskPercent = parseFloat(riskPercentage);
  //   const  win  = parseFloat(takeProfitPrice)

  //   if (entry === stop || entry === win || win === stop) {
  //     setWarningMessage("Entry Price,Stop Loss Price and Take Profit Price cannot be the same.");
  //     resetCalculator();

  //     setTimeout(() => {
  //       setWarningMessage("");
  //     }, 9000);

  //     return;
  //   } else if (riskPercent > 100) {
  //     setWarningMessage("Your risk should be 100 or less.");
  //     resetCalculator();

  //     setTimeout(() => {
  //       setWarningMessage("");
  //     }, 9000);

  //     return;
  //   } else if (riskPercent < 0) {
  //     setWarningMessage("Your risk should not be less than 0.");
  //     resetCalculator();

  //     setTimeout(() => {
  //       setWarningMessage("");
  //     }, 9000);

  //     return;
  //   } else {
  //     const lot = ((riskPercent / 100) * stake) / (entry - stop);
  //     setLotSize(Math.abs(lot).toFixed(4));
  //     const risk = lot * (entry - stop);
  //     const reward = lot * (entry - win);
  //     const riskrewardratio =  (reward / risk)
  //     setRiskAmount(risk.toFixed(2));
  //     setRewardAmount(reward.toFixed(2));
  //     setRiskToReward(`1 : ${riskrewardratio.toFixed(2)}`)
  
  //   }

  //   setWarningMessage(""); // Clear any previous warning messages
  //   setShowResult(true);
  // };



  const calculateResults = () => {
    if (!stakeAmount || !entryPrice || !stopLossPrice || !riskPercentage || !takeProfitPrice) {
      setWarningMessage("All fields are required.");
      resetCalculator();
  
      // Set timeout to clear the warning message after 5 seconds
      setTimeout(() => {
        setWarningMessage("");
      }, 9000);
  
      return;
    }
  
    const stake = parseFloat(stakeAmount);
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLossPrice);
    const riskPercent = parseFloat(riskPercentage);
    const win = parseFloat(takeProfitPrice);

    console.log(`isBuy: ${isBuy ? 'Buy' : 'Sell'}`);
  
    if (entry === stop || entry === win || win === stop) {
      setWarningMessage("Entry Price, Stop Loss Price, and Take Profit Price cannot be the same.");
      resetCalculator();
  
      setTimeout(() => {
        setWarningMessage("");
      }, 9000);
  
      return;
    } else if (riskPercent > 100) {
      setWarningMessage("Your risk should be 100 or less.");
      resetCalculator();
  
      setTimeout(() => {
        setWarningMessage("");
      }, 9000);
  
      return;
    } else if (riskPercent < 0) {
      setWarningMessage("Your risk should not be less than 0.");
      resetCalculator();
  
      setTimeout(() => {
        setWarningMessage("");
      }, 9000);
  
      return;
    }
  
    // Add the new logic for checking stop loss and take profit based on the isBuy toggle
    if (isBuy && (stop > win || stop > entry)) {
      setWarningMessage("For Buy, Stop Loss and Entry Price should be less than Take Profit Price.");
      resetCalculator();
  
      setTimeout(() => {
        setWarningMessage("");
      }, 9000);
  
      return;
    } else if (!isBuy && (stop < win || stop <  entry)) {
      setWarningMessage("For Sell, Stop Loss and Entry Price should be greater than Take Profit Price.");
      resetCalculator();
  
      setTimeout(() => {
        setWarningMessage("");
      }, 9000);
  
      return;
    }
  
    const lot = ((riskPercent / 100) * stake) / Math.abs(entry - stop);
    setLotSize(Math.abs(lot).toFixed(4));
    const risk = lot * Math.abs(entry - stop);
    const reward = lot * Math.abs(entry - win);
    const riskrewardratio = reward / risk;
    setRiskAmount(risk.toFixed(2));
    setRewardAmount(reward.toFixed(2));
    setRiskToReward(`1 : ${riskrewardratio.toFixed(2)}`);
  
    setWarningMessage(""); // Clear any previous warning messages
    setShowResult(true);
  };
  const resetCalculator = () => {
    setStakeAmount("");
    setEntryPrice("");
    setStopLossPrice("");
    setRiskPercentage("");
    setLotSize("");
    setRiskAmount("");
    setTakePrifitPrice("");
    setShowResult(false);
  };

  const addToSavedTrades = async () => {
    calculateResults();
    const currentDate = new Date();
    const newItem = {
      name: route.params.name,
      image: route.params.image,
      id: String(Date.now()),
      stakeAmount,
      entryPrice,
      stopLossPrice,
      riskPercentage,
      lotSize,
      riskAmount,
      rewardAmount,
      riskToReward,
      isBuy,
      dateSaved: currentDate.toLocaleString(),
    };

    try {
      // Get existing saved trades from AsyncStorage
      const savedTrades = await AsyncStorage.getItem("savedTrades");
      const parsedSavedTrades = savedTrades ? JSON.parse(savedTrades) : [];

      // Add the new item to the existing saved trades
      parsedSavedTrades.push(newItem);

      // Save the updated saved trades back to AsyncStorage
      await AsyncStorage.setItem(
        "savedTrades",
        JSON.stringify(parsedSavedTrades)
      );

      // Show an alert to inform the user that the data has been saved
      if (Platform.OS === "android") {
        ToastAndroid.show("Trade Journaled successfully!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error saving ", error);
    }
    resetCalculator();
  };

  

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <CustomHeader
          barIcon={route.params.image}
          bartitle={route.params.name}
        />
        <ScrollView
          style={[styles.container, { backgroundColor: theme.background }]}
        >
          <View
            style={[styles.apicontainer, { backgroundColor: theme.minorcolor }]}
          >
            <View style={[styles.row]}>
              <Text
                style={[styles.label, { color: theme.color }, { fontSize }]}
              >
               Current Price
              </Text>
              <Text
                style={[styles.label, { color: theme.color }, { fontSize }]}
              >
               Min Lot Size
              </Text>
            </View>

            <View style={[styles.row]}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#008080" /> // Show loading spinner
              ) : (
                <Text
                  style={[styles.value, { color: theme.color }, { fontSize }]}
                >
                  {price}
                </Text>
              )}

              <Text
                style={[styles.value, { color: theme.color }, { fontSize }]}
              >
                {minLotSize}
              </Text>
            </View>
          </View>

          {/* Warning message */}
          {warningMessage ? (
            <View style={styles.warningContainer}>
              <Text style={styles.warning}>{warningMessage}</Text>
            </View>
          ) : null}
          <View style={[styles.inputRow, { flexDirection: "row" }]}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text
                style={[styles.label, { color: theme.color }, { fontSize }]}
              >
                Account Balance :
              </Text>
              <TextInput
                style={[styles.input, { color: theme.color }, { fontSize }]}
                value={stakeAmount}
                onChangeText={setStakeAmount}
                keyboardType="numeric"
              />
            </View>

         
          </View>

          <View style={[styles.inputRow, { flexDirection: "row" }]}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text
                style={[styles.label, { color: theme.color }, { fontSize }]}
              >
                Entry Price :
              </Text>
              <TextInput
                style={[styles.input, { color: theme.color }, { fontSize }]}
                value={entryPrice}
                onChangeText={setEntryPrice}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
              <Text
                style={[styles.label, { color: theme.color }, { fontSize }]}
              >
                Risk Percentage :
              </Text>
              <TextInput
                style={[styles.input, { color: theme.color }, { fontSize }]}
                value={riskPercentage}
                onChangeText={setRiskPercentage}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={[styles.inputRow, { flexDirection: "row" }]}>
           
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text
                style={[styles.label, { color: theme.color }, { fontSize }]}
              >
               Stop Loss Price :
              </Text>
              <TextInput
                style={[styles.input, { color: theme.color }, { fontSize }]}
                value={stopLossPrice}
                onChangeText={setStopLossPrice}
                keyboardType="numeric"
              />
            </View>


            <View style={[styles.inputContainer, { flex: 1,marginLeft:10 }]}>
              <Text
                style={[styles.label, { color: theme.color }, { fontSize }]}
              >
               Take Profit Price :
              </Text>
              <TextInput
                style={[styles.input, { color: theme.color }, { fontSize }]}
                value={takeProfitPrice}
                onChangeText={setTakePrifitPrice}
                keyboardType="numeric"
              />
            </View>

          </View>

       
            <View style={styles.switchContainer}>
              <TouchableOpacity
                style={[
                  styles.switchButton,
                  isBuy ? styles.buyButton : styles.inactiveButton,
                ]}
                onPress={() => setIsBuy(true)}
              >
                <Text style={isBuy ? styles.activeText : styles.inactiveText}>
                  BUY
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.switchButton,
                  !isBuy ? styles.sellButton : styles.inactiveButton,
                ]}
                onPress={() => setIsBuy(false)}
              >
                <Text style={!isBuy ? styles.activeText : styles.inactiveText}>
                  SELL
                </Text>
              </TouchableOpacity>
            </View>

            

         
        

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#008080" }]}
              onPress={calculateResults}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.color },
                  { fontSize },
                ]}
              >
                CALCULATE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF6666" }]}
              onPress={resetCalculator}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.color },
                  { fontSize },
                ]}
              >
                RESET
              </Text>
            </TouchableOpacity>
          </View>

     

          {showResult && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showResult}
              onRequestClose={() => setShowResult(false)}
            >
              <View style={styles.modalContainer}>
                <View
                  style={[
                    styles.modalView,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Text
                    style={[
                      styles.resultLabel,
                      { color: theme.color },
                      { fontSize },
                    ]}
                  >
                    LOT SIZE : {lotSize}
                  </Text>
                  <Text
                    style={[
                      styles.resultLabel,
                      { color: "red" },
                      { fontSize },
                    ]}
                  >
                    RISK :  {riskAmount}
                  </Text>
                  <Text
                    style={[
                      styles.resultLabel,
                      { color: "green" },
                      { fontSize },
                    ]}
                  >
                    REWARD  :  {rewardAmount}
                  </Text>

                  <Text
                    style={[
                      styles.resultLabel,
                      { color: theme.color },
                      { fontSize },
                    ]}
                  >
                   RISK : REWARD    {riskToReward}
                  </Text>

                  
                  
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { margin: 10, backgroundColor: "#008080" },
                        { fontSize },
                      ]}
                      onPress={addToSavedTrades}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          { color: theme.color },
                          { fontSize },
                        ]}
                      >
                        JOURNAL
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { margin: 10, backgroundColor: "#FF6666" },
                        { fontSize },
                      ]}
                      onPress={() => setShowResult(false)} // Close the modal
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          { color: theme.color },
                          { fontSize },
                        ]}
                      >
                        CLOSE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
          }}
        >
          {/* Google Mobile Ads Banner */}
          <BannerAd
            unitId="ca-app-pub-6600455892095633/9790890185"
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14, // More padding for a cleaner layout
    marginTop: 5,
 
  },
  inputContainer: {
    marginBottom: 15, // More margin to separate the fields
  },
  label: {
    fontSize: 18, // Slightly larger label font
    fontWeight: "500", // Medium weight for more emphasis
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 16,
    marginTop: 10,
    borderRadius: 10, // Rounded corners
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, // Rounded buttons
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultcard: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // More padding for the result card
    borderRadius: 10,
    marginBottom: 20,
  },
  resultLabel: {
    fontWeight: "bold",
    padding: 10,
  },
  warningContainer: {
    backgroundColor: "#FFCDD2", // Light red background
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  warning: {
    color: "red", // Warning text color
    fontSize: 16,
    textAlign: "center",
  },
  bannerAdContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20, // Margin between result and ad
  },
  apicontainer: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Transparent background
  },
  modalView: {
    width: "80%",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    
  },
  switchContainer: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    marginTop:10,
    marginBottom:20,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  buyButton: {
    backgroundColor: "#4caf50", // Green for Buy
  },
  sellButton: {
    backgroundColor: "#f44336", // Red for Sell
  },
  inactiveButton: {
    backgroundColor: "#ccc", // Gray for inactive state
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "#555",
  },
  placeholder: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CalculatorScreen;
