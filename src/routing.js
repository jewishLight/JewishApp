import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { HomeScreen, DetailsScreen, SettingsScreen } from "./screens";
import { Metric } from "./themes";
import SideMenu from "./components/SideMenu";

const DrawerMenu = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    contentComponent: props => <SideMenu {...props} />,
    initialRouteName: "Home",
    drawerLockMode: "locked-closed",
    drawerWidth: Math.min(Metric.height, Metric.width) * 0.7,
    drawerPosition: "right"
  }
);

const Routing = createStackNavigator(
  {
    Details: { screen: DetailsScreen },
    DrawerMenu: { screen: DrawerMenu }
  },
  {
    initialRouteName: "DrawerMenu",
    headerMode: "none"
  }
);

const AppNavigation = createAppContainer(Routing);

export default AppNavigation;
