import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { FirstScreen } from "./screens";

const Routing = createStackNavigator(
  {
    FirstScreen: { screen: FirstScreen }
  },
  {
    initialRouteName: "FirstScreen",
    headerMode: "none"
  }
);

const AppNavigation = createAppContainer(Routing);

export default AppNavigation;
