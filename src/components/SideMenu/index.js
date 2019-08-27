import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import { styles } from "./styles";
// import LocalStorage from "../../utils/localStorage";
import { Colors } from "../../themes";
import { appSettingsSelector } from "../../redux/selector";
import { AppSettingsActions } from "../../redux";
import { connect } from "react-redux";

const MENU_ITEM_1 = [
  {
    source: require("../../assets/icon_menu_profile.png"),
    name: "My Profile"
  },
  {
    source: require("../../assets/icon_menu_settings.png"),
    name: "Settings"
  },
  {
    source: require("../../assets/icon_menu_favorite.png"),
    name: "Favorite"
  },
  {
    source: require("../../assets/icon_flag_israel.png"),
    name: "Move to Hebrew"
  }
];

const MENU_ITEM_2 = [
  {
    source: require("../../assets/icon_menu_profile.png"),
    name: "My Profile"
  },
  {
    source: require("../../assets/icon_menu_settings.png"),
    name: "Settings"
  },
  {
    source: require("../../assets/icon_menu_favorite.png"),
    name: "Favorite"
  },
  {
    source: require("../../assets/icon_flag_usa.png"),
    name: "Move to English"
  }
];

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MENU_ITEMS: MENU_ITEM_1
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.appSettings.language !== nextProps.appSettings.language) {
      if (this.props.appSettings.language === "English") {
        this.setState({ MENU_ITEMS: MENU_ITEM_2 });
      } else {
        this.setState({ MENU_ITEMS: MENU_ITEM_1 });
      }
    }
  }

  onPressMenu = async index => {
    this.closeMenu();
    switch (index) {
      case 0:
        this.props.navigation.navigate("Settings");
        break;
      case 1:
        this.props.navigation.navigate("Settings");
        break;
      case 2:
        break;
      case 3:
        if (this.props.appSettings.language === "English") {
          this.props.updateLanguage("Hebrew");
        } else {
          this.props.updateLanguage("English");
        }
        break;
      default:
        break;
    }
  };

  closeMenu = () => {
    this.props.navigation.closeDrawer();
  };

  onLogout = () => {
    this.closeMenu();
  };

  goHome = () => {
    this.closeMenu();
    this.props.navigation.navigate("Home");
  };

  renderListItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.onPressMenu(index)}
      >
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
              source={require("./../../assets/icon_logo.png")}
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
            onPress={this.onLogout}
          >
            <View style={styles.logoImageView}>
              <Image
                source={require("../../assets/icon_menu_close.png")}
                style={styles.iconMenu}
              />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  ...appSettingsSelector(state)
});
const mapDispatchToProps = dispatch => ({
  updateDeviceStatus: isDeviceTurnON =>
    dispatch(AppSettingsActions.updateDeviceStatus(isDeviceTurnON)),
  updateLightStatus: isLightTurnON =>
    dispatch(AppSettingsActions.updateLightStatus(isLightTurnON)),
  updateLanguage: language =>
    dispatch(AppSettingsActions.updateLanguage(language))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
