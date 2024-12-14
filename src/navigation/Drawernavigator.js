import React, { useState, useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ThemeContext } from "../theme/ThemeContext";
import Homescreen from "../screens/Homescreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import DrawerContent from "../components/DrawerContent";
import { EventRegister } from "react-native-event-listeners";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Settings from "../screens/Settings";
import About from "../screens/About";
import Theme from "../theme/Theme";
import SavedTrades from "../screens/SavedTrades";
import RemoveAds from "../screens/RemoveAds";
import { FontSizeProvider } from "../components/FontSizeContext";
import PrivacyPolicy from "../screens/Privacypolicy";
import Disclaimer from "../screens/Disclaimer";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const DrawerNavigator = () => {
  const [darkmode, setDarkmode] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const listener = EventRegister.addEventListener("changetheme", (data) => {
      setDarkmode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkmode]);



  return (
    <FontSizeProvider>
    <ThemeContext.Provider value={darkmode === true ? Theme.dark : Theme.light}>
      <NavigationContainer value={darkmode === true ? Theme.dark : Theme.light}>
      <Drawer.Navigator
      initialRouteName="Homescreen"
      drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Homescreen" component={Homescreen} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="CalculatorScreen" component={CalculatorScreen} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="SavedTrades" component={SavedTrades} />
      <Drawer.Screen name="RemoveAds" component={RemoveAds} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Drawer.Screen name="Disclaimer" component={Disclaimer} />
    </Drawer.Navigator>
    
      </NavigationContainer>
    </ThemeContext.Provider>
    </FontSizeProvider>
  );
};

export default DrawerNavigator;
