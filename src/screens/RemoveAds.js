import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import { useFontSize } from "../components/FontSizeContext";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { Provider } from "react-native-paper";
const RemoveAds = () => {
  const { fontSize } = useFontSize();
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <CustomHeader bartitle="Premium Version" />
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Text style={[styles.heading, { color: theme.color }, { fontSize }]}>
            Why Upgrade to Premium?
          </Text>
          <Text style={[styles.text, { color: theme.color }, { fontSize }]}>
            Ad-Free Experience.
          </Text>
          <Text style={[styles.text, { color: theme.color }, { fontSize }]}>
           More amazing features
          </Text>
          <Text style={[styles.text, { color: theme.color }, { fontSize }]}>
            All ads will be permanently removed and you will enjoy the full
            funtionality of the app without ads interference.
          </Text>

         
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              if (Platform.OS === "android") {
                ToastAndroid.show("Coming soon", ToastAndroid.SHORT);
              }
            }}
          >
            <Text style={[styles.buttonText,{color:theme.color}, { fontSize }]}>
              Purchase Premium Version
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#fff",
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "#FF6666",
    padding: 16,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RemoveAds;
