import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { View, Platform, ScrollView } from "react-native";
import { styles } from "./styles";
import { appSettingsSelector } from "../../redux/selector";
import { AppSettingsActions } from "../../redux";
import { connect } from "react-redux";
import {
  HomeHeader,
  SearchButton,
  AddButton,
  FilterButton
} from "../../components";
import { AroundEvents } from "./AroundEvents";
import { TodayLessons } from "./TodayLessons";
import { PopularLessons } from "./PopularLessons";
import { RecentLessons } from "./RecentLessons";

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
        </View>
        <View style={styles.buttonsLine}>
          <FilterButton onPress={this.onFilter} />
          <View style={styles.addSearchLine}>
            <AddButton onPress={this.onAdd} />
            <View style={styles.horizontalSpacing} />
            <SearchButton onPress={this.onSearch} />
          </View>
        </View>
        <ScrollView>
          <AroundEvents />
          <TodayLessons />
          <PopularLessons />
          <RecentLessons />
        </ScrollView>
      </SafeAreaView>
    );
  }

  onHeaderLocation = () => {
    if (this.refHomeHeader) {
      this.refHomeHeader.updateLocation("London, UK");
    }
  };
  onHeaderMenu = () => {};

  onSearch = () => {};
  onAdd = () => {};
  onFilter = () => {};
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
