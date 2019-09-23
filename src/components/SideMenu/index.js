import React, {Component} from 'react';
import {SafeAreaView, StackActions, NavigationActions} from 'react-navigation';
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Linking,
  I18nManager,
  NativeModules,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {Colors} from '../../themes';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {LocalStorage, Strings} from '../../utils';
import RNRestart from 'react-native-restart';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import config from '../../config';

const MENU_ITEM_1 = [
  {
    source: require('../../assets/icon_menu_profile.png'),
    name: 'My Profile',
  },
  {
    source: require('../../assets/icon_menu_settings.png'),
    name: 'Settings',
  },
  {
    source: require('../../assets/icon_menu_favorite.png'),
    name: 'Favorite',
  },
  {
    source: require('../../assets/icon_flag_israel.png'),
    name: 'Move to Hebrew',
  },
];

const MENU_ITEM_2 = [
  {
    source: require('../../assets/icon_menu_profile.png'),
    name: 'My Profile',
  },
  {
    source: require('../../assets/icon_menu_settings.png'),
    name: 'Settings',
  },
  {
    source: require('../../assets/icon_menu_favorite.png'),
    name: 'Favorite',
  },
  {
    source: require('../../assets/icon_flag_usa.png'),
    name: 'Move to English',
  },
];

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MENU_ITEMS: MENU_ITEM_1,
      language: Strings.HEBREW,
    };
  }

  componentDidMount(): void {
    this._configureGoogleSignout();
    const language = this.props.appSettings.language;
    this.setState({language});
    if (language === Strings.ENGLISH) {
      this.setState({MENU_ITEMS: MENU_ITEM_1});
    } else {
      this.setState({MENU_ITEMS: MENU_ITEM_2});
    }
  }

  _configureGoogleSignout = () => {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.appSettings.language !== nextProps.appSettings.language) {
      if (nextProps.appSettings.language === Strings.ENGLISH) {
        this.setState({MENU_ITEMS: MENU_ITEM_1});
      } else {
        this.setState({MENU_ITEMS: MENU_ITEM_2});
      }
    }
  }

  onPressMenu = async index => {
    this.closeMenu();
    switch (index) {
      case 0:
        this.props.navigation.navigate('MyProfile');
        break;
      case 1:
        this.props.navigation.navigate('Settings');
        break;
      case 2:
        break;
      case 3:
        if (this.props.appSettings.language === Strings.ENGLISH) {
          await LocalStorage.setLanguage(Strings.HEBREW);
          this.props.updateLanguage(Strings.HEBREW);
          // I18nManager.forceRTL(false);
          I18nManager.allowRTL(true);
          RNRestart.Restart();
        } else {
          await LocalStorage.setLanguage(Strings.ENGLISH);
          this.props.updateLanguage(Strings.ENGLISH);
          I18nManager.allowRTL(false);
          RNRestart.Restart();
        }
        // NativeModules.DevSettings.reload();
        break;
      default:
        break;
    }
  };

  closeMenu = () => {
    this.props.navigation.closeDrawer();
  };

  _googleSignout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  onLogout = async () => {
    this.closeMenu();
    await LocalStorage.setLoggedIn(false);
    await LocalStorage.setToken('');
    if (Strings.loginType === Strings.LOGIN_TYPE_GOOGLE) {
      await this._googleSignout();
    }
    Strings.localToken = '';
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      }),
    );
  };

  goHome = () => {
    this.closeMenu();
    this.props.navigation.navigate('Home');
  };

  renderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.onPressMenu(index)}>
        <View style={styles.logoImageView}>
          <Image source={item.source} style={styles.iconMenu} />
        </View>
        <Text style={styles.logoutText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.logoContainer} onPress={this.goHome}>
          <View style={styles.logoImageView}>
            <Image
              source={require('./../../assets/icon_logo.png')}
              style={styles.imgLogo}
            />
          </View>
          <Text style={styles.logoText}>Jewish</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.MENU_ITEMS}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={this.renderListItem}
          style={styles.listContainer}
          scrollEnabled={false}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={this.onLogout}>
            <View style={styles.logoImageView}>
              <Image
                source={require('../../assets/icon_menu_close.png')}
                style={styles.iconMenu}
              />
            </View>
            <Text style={styles.logoutText}>Logout(0.0.10)</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ...appSettingsSelector(state),
});
const mapDispatchToProps = dispatch => ({
  updateDeviceStatus: isDeviceTurnON =>
    dispatch(AppSettingsActions.updateDeviceStatus(isDeviceTurnON)),
  updateLightStatus: isLightTurnON =>
    dispatch(AppSettingsActions.updateLightStatus(isLightTurnON)),
  updateLanguage: language =>
    dispatch(AppSettingsActions.updateLanguage(language)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);
