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

const MENU_ITEMS = [
  { source: require("../../assets/icon_menu_profile.png"), name: "My Profile" },
  { source: require("../../assets/icon_menu_settings.png"), name: "Settings" },
  { source: require("../../assets/icon_menu_favorite.png"), name: "Favorite" },
  {
    source: require("../../assets/icon_flag_israel.png"),
    name: "Move to Hebrew"
  }
];

export class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressMenu = async index => {
    switch (index) {
      case 0:
        this.props.navigation.navigate("Details");
        break;
      case 1:
        this.props.navigation.navigate("Details");
        break;
      case 2:
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

  renderListItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.onPressMenu(index)}
      >
        <View
          style={{
            width: 55,
            height: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image source={item.source} style={styles.iconMenu} />
        </View>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <View
            style={{
              width: 55,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("./../../assets/icon_logo.png")}
              style={styles.imgLogo}
            />
          </View>
          <Text style={{ fontSize: 30, color: "#9EA3BA" }}>Jewish</Text>
        </View>
        <FlatList
          data={MENU_ITEMS}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={this.renderListItem}
          style={styles.listContainer}
          scrollEnabled={false}
        />
        <View style={styles.bottomContainer}>
          <View style={{ height: 1, backgroundColor: Colors.separator }} />
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={this.onLogout}
          >
            <View
              style={{
                width: 55,
                height: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../../assets/icon_menu_close.png")}
                style={styles.iconMenu}
              />
            </View>
            <Text style={{ fontSize: 18 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
