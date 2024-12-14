import { View, Text, Image } from 'react-native';
import { Appbar } from "react-native-paper";
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFontSize } from './FontSizeContext';
import { useInterstitialAd } from "react-native-google-mobile-ads";

const CustomHeader = ({ bartitle, barIcon }) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const { fontSize } = useFontSize();

  const adUnitId = "ca-app-pub-6600455892095633/7127639144";

  const { isLoaded, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  return (
    <Appbar.Header style={{ backgroundColor: theme.background }}>
      <Appbar.Action
        icon="arrow-left"
        size={27}
        color={theme.color}
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            // No advert ready to show yet
            setTimeout(() => {
              navigation.goBack();
            }, 300);
          }
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        {barIcon && (
          <Image
            source={barIcon} // Expecting barIcon to be a valid image source (require or URI)
            style={{ width: 30, height: 30, margin: 15 }} // Adjust size and spacing
            resizeMode="contain"
          />
        )}
        <Text style={{ fontSize, color: theme.color, fontWeight: 'bold' }}>
          {bartitle}
        </Text>
      </View>
    </Appbar.Header>
  );
};

export default CustomHeader;
