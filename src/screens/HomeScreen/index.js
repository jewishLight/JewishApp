import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { View, Platform, Text } from "react-native";
import { styles } from "./styles";
import { appSettingsSelector } from "../../redux/selector";
import { AppSettingsActions } from "../../redux";
import { connect } from "react-redux";
import { HomeHeader } from "../../components";

class HomeScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== "ios"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <HomeHeader
            onLocation={this.onHeaderLocation}
            onMenu={this.onHeaderMenu}
            ref={ref => {
              this.refHomeHeader = ref;
            }}
          />
          <Text>Hello World !!!</Text>
        </View>
      </SafeAreaView>
    );
  }

  onHeaderLocation = () => {
    if (this.refHomeHeader) {
      this.refHomeHeader.updateLocation("London, UK");
    }
  };
  onHeaderMenu = () => {};
}

const mapStateToProps = state => ({
  ...appSettingsSelector(state)
});
const mapDispatchToProps = dispatch => ({
  updateDeviceStatus: isDeviceTurnON =>
    dispatch(AppSettingsActions.updateDeviceStatus(isDeviceTurnON)),
  updateLightStatus: isLightTurnON =>
    dispatch(AppSettingsActions.updateLightStatus(isLightTurnON))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
