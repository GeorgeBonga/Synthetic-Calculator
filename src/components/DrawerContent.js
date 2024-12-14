import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Linking } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { EventRegister } from "react-native-event-listeners";
import { ThemeContext } from "../theme/ThemeContext";
import Switch from "react-native-switch-toggles-2";
import Icon from "react-native-vector-icons/Octicons";
import Theme from "../theme/Theme";
import { useInterstitialAd } from "react-native-google-mobile-ads";

const DrawerContent = (props) => {
  const theme = useContext(ThemeContext);
  const [darkmode, setDarkmode] = useState(false);
  const adUnitId = "ca-app-pub-6600455892095633/7127639144";

  const { isLoaded, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  return (
    <DrawerContentScrollView
      {...props}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerText, { color: theme.color }]}>
          SYNTHETIC CALCULATOR
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Switch
            containerStyle={{ borderColor: theme.background, borderWidth: 1 }}
            additionalThumbStyle={{ margin: 2, height: 30, width: 30, borderRadius: 15 }}
            activeTrackColor={"#3e3e3e"}
            inactiveThumbColor={"#4B77B6"}
            activeThumbColor={"#4B77B6"}
            size={36}
            value={darkmode}
            onChange={(value) => {
              setDarkmode(value);
              EventRegister.emit("changetheme", value);
            }}
          />
        </View>
      </View>
      <DrawerItem
        label="INDICES"
        onPress={() => props.navigation.navigate("Homescreen")}
        labelStyle={[styles.drawerItemLabel, { color: theme.color }]}
        icon={() => <Icon name="graph" size={24} color={theme.color} />}
      />
      <View style={styles.separator} />
      <DrawerItem
        label="JOURNAL"
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            // No advert ready to show yet
            props.navigation.navigate("SavedTrades");
          }
        }}
        labelStyle={[styles.drawerItemLabel, { color: theme.color }]}
        icon={() => <Icon name="book" size={24} color={theme.color} />}
      />
      <DrawerItem
        label="SETTINGS"
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            // No advert ready to show yet
            props.navigation.navigate("Settings");
          }
        }}
        labelStyle={[styles.drawerItemLabel, { color: theme.color }]}
        icon={() => <Icon name="gear" size={24} color={theme.color} />}
      />
      <DrawerItem
        label="REMOVE ADS"
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            // No advert ready to show yet
            props.navigation.navigate("RemoveAds");
          }
        }}
        labelStyle={[styles.drawerItemLabel, { color: theme.color }]}
        icon={() => <Icon name="shield" size={24} color={theme.color} />}
      />
      <DrawerItem
        label="PRIVACY POLICY"
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            // No advert ready to show yet
            props.navigation.navigate("PrivacyPolicy");
          }
        }}
      
        labelStyle={[styles.drawerItemLabel, { color: theme.color }]}
        icon={() => <Icon name="lock" size={24} color={theme.color} />}
      />
      <DrawerItem
        label="SEND FEEDBACK"
        onPress={() => Linking.openURL("mailto:bongageorge18@gmail.com")}
        labelStyle={[styles.drawerItemLabel, { color: theme.color }]}
        icon={() => <Icon name="mail" size={24} color={theme.color} />}
      />

      <View style={[styles.separator, { marginBottom: 10 }]} />
      <DrawerItem
        label="ABOUT"
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            // No advert ready to show yet
            props.navigation.navigate("About");
          }
        }}
      
        labelStyle={[styles.drawerItemLabel, { bottom: 0, color: theme.color }]}
        icon={() => <Icon name="info" size={24} color={theme.color} />}
      />

      <DrawerItem
        icon={() => (
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/6143956.png")} style={styles.logo} />
          </View>
        )}
        label="DERIV"
        onPress={() => Linking.openURL('https://track.deriv.com/__KPt6wbh9A5MjdsyM5hasGNd7ZgqdRLk/1/')}
        labelStyle={{ fontWeight: "bold", color: theme.color }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#f4511e",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  switchLabel: {
    color: "#000",
    marginRight: 10,
  },
  drawerItemLabel: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 30,
    height: 30,
  },
});

export default DrawerContent;