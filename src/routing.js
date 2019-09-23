import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import {
  HomeScreen,
  DetailsScreen,
  SettingsScreen,
  SplashScreen,
  SearchScreen,
  SearchResultScreen,
  FilterScreen,
  SynaScreen,
  IntroScreen,
  FavoriteScreen,
  MapViewScreen,
  LoginScreen,
  MyProfileScreen,
  NewLessonScreen,
  NewSynaScreen,
  SearchSynaScreen,
} from './screens';
import {Metric} from './themes';
import SideMenu from './components/SideMenu';

const DrawerMenu = createDrawerNavigator(
  {
    Home: {screen: HomeScreen},
    Settings: {screen: SettingsScreen},
  },
  {
    contentComponent: props => <SideMenu {...props} />,
    initialRouteName: 'Home',
    drawerLockMode: 'locked-closed',
    drawerWidth: Math.min(Metric.height, Metric.width) * 0.7,
    drawerPosition: 'right',
  },
);

const Routing = createStackNavigator(
  {
    Splash: {screen: SplashScreen},
    Intro: {screen: IntroScreen},
    DrawerMenu: {screen: DrawerMenu},
    Details: {screen: DetailsScreen},
    Search: {screen: SearchScreen},
    SearchResult: {screen: SearchResultScreen},
    Filter: {screen: FilterScreen},
    Syna: {screen: SynaScreen},
    Favorite: {screen: FavoriteScreen},
    MapView: {screen: MapViewScreen},
    Login: {screen: LoginScreen},
    MyProfile: {screen: MyProfileScreen},
    NewLesson: {screen: NewLessonScreen},
    NewSyna: {screen: NewSynaScreen},
    SearchSyna: {screen: SearchSynaScreen},
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

const AppNavigation = createAppContainer(Routing);

export default AppNavigation;
