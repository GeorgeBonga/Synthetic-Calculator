import { View, Text, Button,StatusBar } from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import React, { useContext, useLayoutEffect } from "react";
import SyntheticList from "../components/SyntheticList";
import CustomHeader from "../components/CustomHeader";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { Appbar,Provider } from "react-native-paper";
import {
  BannerAd,
  BannerAdSize,
} from "react-native-google-mobile-ads";

const Homescreen = (props) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Provider>
      <View style={{ backgroundColor: theme.background, flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: theme.background }}>
          <Appbar.Action
            icon={() => <Icon name="bars" size={40}  color={theme.color} />}
            size={37}
            color={theme.color}
            onPress={() => props.navigation.openDrawer()}
          />
          <Appbar.Content
            title="SYNTHETIC  CALCULATOR"
            subtitle="INDICES"
            color={theme.color}
            titleStyle={{ fontSize: 20 }}
          />
        </Appbar.Header>
        <SyntheticList />
    
      </View>

    </Provider>
  );
};

export default Homescreen;
