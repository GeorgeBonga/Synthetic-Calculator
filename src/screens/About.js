import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useContext, useLayoutEffect } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useFontSize } from "../components/FontSizeContext";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { Provider } from "react-native-paper";
import CustomHeader from "../components/CustomHeader";

export default function About() {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const { fontSize } = useFontSize();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <CustomHeader bartitle="ABOUT" />
        <View style={{ flex: 1, backgroundColor: theme.background }}>
          <View style={styles.infoContainer}>
            <Text style={[styles.appTitle, { color: theme.color, fontSize }]}>
              SYNTHETIC CALCULATOR
            </Text>
            <Text
              style={[
                styles.appSubtitle,
                { color: theme.majorcolor, fontSize },
              ]}
            >
              Your Ultimate Risk Management Tool
            </Text>

            <View style={styles.divider} />

            <Text
              style={[styles.sectionTitle, { color: theme.color, fontSize }]}
            >
              Application Info
            </Text>
            <Text
              style={[styles.infoText, { color: theme.majorcolor, fontSize }]}
            >
              Version: 1.0
            </Text>
            <Text
              style={[styles.infoText, { color: theme.majorcolor, fontSize }]}
            >
              Developer: George Bonga
            </Text>

            <View style={styles.divider} />

            <Text
              style={[
                styles.quote,
                {
                  color: theme.color,
                  fontSize,
                  textAlign: "justify",
                  lineHeight: 24,
                },
              ]}
            >
              The Synthetic Calculator offers a user-friendly experience,
              providing efficient and accurate risk management calculations.
              Built with a focus on simplicity and quality, the app continuously
              evolves through user feedback. We aim to make complex calculations
              easy and accessible for everyone.
            </Text>
            <View style={styles.divider} />

            <Text
              style={[
                styles.thankYouText,
                { color: theme.majorcolor, fontSize },
              ]}
            >
              Thank you for choosing Synthetic Calculator!
            </Text>
          </View>
        </View>

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
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  divider: {
    width: "95%",
    height: 1,
    backgroundColor: "#dddddd",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
  quote: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 14,
    lineHeight: 24,
    marginBottom: 16,
  },
  thankYouText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
});
