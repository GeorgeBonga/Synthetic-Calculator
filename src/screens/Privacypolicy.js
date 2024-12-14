import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native"; // Import Linking and TouchableOpacity
import CustomHeader from "../components/CustomHeader";
import { useFontSize } from "../components/FontSizeContext";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Provider } from "react-native-paper";
import { BannerAd,BannerAdSize } from "react-native-google-mobile-ads";

const PrivacyPolicy = () => {
  const { fontSize } = useFontSize();
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Function to handle the email link press
  const handleEmailLinkPress = () => {
    const email = "bongageorge17@gmail.com";
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <Provider>
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <CustomHeader bartitle="Privacy Policy" />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.heading, { color: theme.color, fontSize }]}>
          Privacy Policy
        </Text>
        <Text style={[styles.text, { color: theme.color, fontSize }]}>
        The Synthetic Calculator app does not collect any personal data from users and does not require special permissions to function.
         
        </Text>
        <Text style={[styles.text, { color: theme.color, fontSize }]}>
        Our app is designed to
        operate fully without accessing or collecting any personal information from your device.
        </Text>
        <Text style={[styles.heading, { color: theme.color, fontSize }]}>
          Contact Us
        </Text>
  
          <Text style={[{ color: theme.color, fontSize }]}>
            If you have any questions or concerns regarding this Privacy Policy,
            please contact us at:
          </Text>
          <TouchableOpacity onPress={handleEmailLinkPress}>
            <Text style={[styles.emailLink, { color: theme.color, fontSize }]}>
            contact@devsupport.com
            </Text>
          </TouchableOpacity>
     
      </View>
      <View
           style={{
             backgroundColor:theme.background,
             alignItems: "center"
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  emailLink: {
    fontSize: 10,
    color: "#007bff", // Use your desired link color
    textDecorationLine: "underline",
  },
});

export default PrivacyPolicy;
