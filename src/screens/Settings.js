import React, { useContext, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import RadioButton from "../components/RadioButton";
import { useFontSize } from "../components/FontSizeContext";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import {
  BannerAd,
  BannerAdSize,
  useInterstitialAd,
} from "react-native-google-mobile-ads";
import { Provider } from "react-native-paper";

const Setting = () => {
  const { fontSize, onChangeFontSize } = useFontSize();
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const adUnitId = "ca-app-pub-6600455892095633/7127639144";

  const { isLoaded, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleFontSizeChange = (size) => {
    onChangeFontSize(size);
  };

  const SettingComponent = ({ name, screen }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: theme.background }]}
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            navigation.navigate(screen);
          }
        }}
      >
        <Text style={[styles.itemText, { color: theme.color }, { fontSize }]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <CustomHeader bartitle="Settings" />
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <View style={styles.section}>
            <Text style={[styles.heading, { color: theme.color }, { fontSize }]}>
              Font Size
            </Text>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                label="Small"
                selected={fontSize === 12}
                onSelect={() => handleFontSizeChange(12)}
              />
              <RadioButton
                label="Default"
                selected={fontSize === 16}
                onSelect={() => handleFontSizeChange(16)}
                color="#FF5733"
              />
              <RadioButton
                label="Large"
                selected={fontSize === 20}
                onSelect={() => handleFontSizeChange(20)}
                color="#33FF57"
              />
            </View>
          </View>

          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={[styles.heading, { color: theme.color }, { fontSize }]}>
              Default
            </Text>
            <View style={[styles.itemContainer, { backgroundColor: theme.background }]}>
              <Text style={[styles.itemText, { color: theme.color }, { fontSize }]}>
                Language
              </Text>
              <Text style={{ color: "gray" }}>English</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.heading, { color: theme.color }, { fontSize }]}>
              Other
            </Text>
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: theme.background }]}
              onPress={() => {
                if (isLoaded) {
                  show();
                } else {
                  setVisible(false);
                  Linking.openURL("market://details?id=com.syntheticdcalculator").catch(
                    () => {
                      Linking.openURL(
                        "https://play.google.com/store/apps/details?id=com.syntheticdcalculator"
                      );
                    }
                  );
                }
              }}
            >
              <Text style={[styles.itemText, { color: theme.color }, { fontSize }]}>
                Rate this App
              </Text>
            </TouchableOpacity>

            <SettingComponent screen={"Disclaimer"} name="Disclaimer" />
            <SettingComponent screen={"RemoveAds"} name="Remove Ads" />
            <SettingComponent screen={"PrivacyPolicy"} name="Privacy Policy" />
          </View>
        </View>
        <View style={{ alignItems: "center", backgroundColor: theme.background }}>
          <BannerAd
            unitId="ca-app-pub-6600455892095633/9790890185"
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: false,
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
    backgroundColor: "#fff",
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "400",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 16,
  },
});

export default Setting;