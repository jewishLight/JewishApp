import React, { Component, Fragment } from "react";
import { SafeAreaView } from "react-navigation";
import { View, Platform, Text } from "react-native";
import { styles } from "./styles";
import { appSettingsSelector } from "../../redux/selector";
import { AppSettingsActions } from "../../redux";
import { connect } from "react-redux";
import { DetailsHeader } from "../../components";

class DetailsScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== "ios"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.topSafeAreaView} />
        <SafeAreaView style={styles.bottomSafeAreaView}>
          <View style={styles.container}>
            <DetailsHeader
              onBack={this.onBack}
              onEdit={this.onEdit}
              onFavorite={this.onFavorite}
              onSend={this.onSend}
            />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }

  onBack = () => {
    this.props.navigation.goBack();
  };
  onSend = () => {};
  onFavorite = () => {};
  onEdit = () => {};
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
)(DetailsScreen);
