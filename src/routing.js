import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { HomeScreen } from "./screens";
import { Metric } from "./themes";

const DrawerMenu = createDrawerNavigator(
  {
    Drawer1: { screen: HomeScreen }
  },
  {
    initialRouteName: "Drawer1",
    drawerLockMode: "locked-closed",
    drawerWidth: Math.min(Metric.height, Metric.width) * 0.7,
    drawerPosition: "right"
  }
);

const Routing = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    DrawerMenu: { screen: DrawerMenu }
  },
  {
    initialRouteName: "DrawerMenu",
    headerMode: "none"
  }
);

const AppNavigation = createAppContainer(Routing);

export default AppNavigation;
