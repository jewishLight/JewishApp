import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { HomeScreen, DetailsScreen } from "./screens";
import { Metric } from "./themes";
import { SideMenu } from "./components";

const DrawerMenu = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen }
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
