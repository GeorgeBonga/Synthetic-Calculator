import React, { useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { useFontSize } from "../components/FontSizeContext";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const Disclaimer = () => {
  const { fontSize } = useFontSize();
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <CustomHeader bartitle="Disclaimer" />
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: theme.background },
          ]}
        >
          <Text style={[styles.heading, { color: theme.color, fontSize }]}>
            Disclaimer for Synthetic Calculator
          </Text>
          <Text style={[styles.text, { color: theme.color, fontSize }]}>
            The Synthetic Calculator is designed to assist traders in evaluating their risk before entering a trade. We strive to provide accurate and reliable calculations, but we cannot guarantee complete precision in all results.
          </Text>
          <Text style={[styles.text, { color: theme.color, fontSize }]}>
            The creators of this app are not responsible for any losses or damages resulting from the use or misuse of the information provided by the Synthetic Calculator. Users should make trading decisions independently and use the app as a supportive tool at their own risk.
          </Text>
          <Text style={[styles.text, { color: theme.color, fontSize }]}>
            This app may utilize simplified models for calculations, and the results should not replace professional-grade tools or financial advice.
          </Text>
          <Text style={[styles.text, { color: theme.color, fontSize }]}>
            By using the Synthetic Calculator, you agree to these terms and acknowledge that the results are intended for informational purposes only.
          </Text>
        </ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
            paddingVertical: 10,
          }}
        >
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
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 14,
    textAlign: "justify",
  },
});

export default Disclaimer;
