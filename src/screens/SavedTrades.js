import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ThemeContext } from "../theme/ThemeContext";
import CustomHeader from "../components/CustomHeader";
import { Provider, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFontSize } from "../components/FontSizeContext";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
const SavedTrades = () => {
  const [savedTradesData, setSavedTradesData] = useState([]);
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const { fontSize } = useFontSize();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getSavedTrades = async () => {
    try {
      const savedTrades = await AsyncStorage.getItem("savedTrades");
      let parsedSavedTrades = savedTrades ? JSON.parse(savedTrades) : [];

      // Sort the trades based on the dateSaved property in descending order
      parsedSavedTrades = parsedSavedTrades.sort((a, b) => b.id - a.id);

      setSavedTradesData(parsedSavedTrades);
    } catch (error) {
      console.error("Error retrieving saved trades:", error);
    }
  };

  const deleteTrade = async (id) => {
    try {
      // Filter out the trade with the given id
      const updatedSavedTrades = savedTradesData.filter(
        (trade) => trade.id !== id
      );
      setSavedTradesData(updatedSavedTrades);
      // Save the updated trades list to AsyncStorage
      await AsyncStorage.setItem(
        "savedTrades",
        JSON.stringify(updatedSavedTrades)
      );
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Call the getSavedTrades function whenever the screen comes into focus
      getSavedTrades();
    }, [])
  );

  return (
    <Provider>
      <Appbar.Header
        style={{
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: theme.background,
        }}
      >
        <Appbar.Action
          icon="arrow-left"
          size={24}
          color={theme.color}
          onPress={() =>
            setTimeout(() => {
              navigation.goBack();
            }, 300)
          }
        />
        <Appbar.Content
          title="JOURNAL"
          color={theme.color}
          titleStyle={[{ fontWeight: "bold" }, { fontSize }]}
        />
      </Appbar.Header>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <FlatList
          data={savedTradesData}
          renderItem={({ item }) => (
            <View style={styles.tradeItem}>
              <View style={styles.journaledderiv}>
                <Image style={{ marginRight: 15 }} source={item.image} />
                <Text style={[{ color: theme.color }, { fontSize }]}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row",justifyContent:"space-between"}}>
                <Text style={[{ color: theme.color }, { fontSize }]}>
                Account Balance: {item.stakeAmount}
                </Text>
                <View
                  style={[
                    {
                      backgroundColor: item.isBuy ? "green" : "red",
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 30,
                    
                    },
                    { color: theme.color },
                  ]}
                >
                  <Text style={{ color: "white", fontSize }}>
                    {item.isBuy ? "Buy" : "Sell"}
                  </Text>
                </View>
              </View>

              <Text style={[{ color: theme.color }, { fontSize }]}>
               
                Trade ID: {item.id}
              </Text>
              <Text style={[{ color: theme.color }, { fontSize }]}>
                Entry Price: {item.entryPrice}
              </Text>
              <Text style={[{ color: theme.color }, { fontSize }]}>
                Stop Loss Price: {item.stopLossPrice}
              </Text>
              <Text style={[{ color: theme.color }, { fontSize }]}>
                Risk Percentage: {item.riskPercentage}
              </Text>
              <Text style={[{ color: theme.color }, { fontSize }]}>
                Lot Size: {item.lotSize}
              </Text>
              <Text style={[{ color: theme.color }, { fontSize }]}>
                Risk Amount: {item.riskAmount}
              </Text>
              <Text style={[{ color: theme.color }, { fontSize }]}>
                Reward Amount: {item.rewardAmount}
              </Text>
              <Text style={[{ color: theme.color }, { fontSize }]}>
                Risk To Reward : {item.riskToReward}
              </Text>

              <Text style={[{ color: theme.color }, { fontSize }]}>
                Date : {item.dateSaved}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTrade(item.id)}
              >
                <Text
                  style={[
                    styles.deleteButtonText,
                    { color: theme.color },
                    { fontSize },
                  ]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          backgroundColor: theme.background,
          alignItems: "center",
        }}
      >
        <BannerAd
          unitId="ca-app-pub-6600455892095633/9790890185"
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  journaledderiv: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    padding: 10,
    marginBottom: 3,
    fontWeight: "bold",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tradeItem: {
    backgroundColor: "#3333",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#FF6666",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default SavedTrades;
