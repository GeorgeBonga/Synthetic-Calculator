import React from "react";
import { View, Text, StatusBar, AppState } from "react-native";

import DrawerNavigator from "./src/navigation/Drawernavigator";
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6666" />
      <DrawerNavigator />
    </View>
  );
};

export default App;
