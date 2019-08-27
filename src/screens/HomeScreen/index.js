import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  I18nManager,
  NativeModules
} from "react-native";
import { styles } from "./styles";
import { appSettingsSelector } from "../../redux/selector";
import { AppSettingsActions } from "../../redux";
import { connect } from "react-redux";
import {
  HomeHeader,
  SearchButton,
  AddButton,
  FilterButton,
  AddModal,
  FilterModal,
  NewLessonModal,
  NewSynModal
} from "../../components";
import { AroundEvents } from "./AroundEvents";
import { TodayLessons } from "./TodayLessons";
import { PopularLessons } from "./PopularLessons";
import { RecentLessons } from "./RecentLessons";
import { Strings, LocalStorage } from "../../utils";

class HomeScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== "ios"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let language = await LocalStorage.getLanguage();
    if (language) {
      if (language === "English") {
        I18nManager.forceRTL(false);
      } else {
        I18nManager.forceRTL(true);
      }
    } else {
      language = "English";
      I18nManager.forceRTL(false);
      await LocalStorage.setLanguage(language);
    }
    this.props.updateLanguage(language);
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.appSettings.language !== nextProps.appSettings.language) {
      this.setState({ language: nextProps.appSettings.language });
      if (this.refHomeHeader) {
        this.refHomeHeader.updateLanguage(nextProps.appSettings.language);
      }
    }
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
            language={this.props.appSettings.language}
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
          <AroundEvents onDetails={this.onDetails} />
          <TodayLessons />
          <PopularLessons />
          <RecentLessons />
        </ScrollView>
        <AddModal
          ref={ref => {
            this.refAddModal = ref;
          }}
          callBack={this.callBackAddModal}
        />
        <FilterModal
          ref={ref => {
            this.refFilterModal = ref;
          }}
        />
        <NewLessonModal
          ref={ref => {
            this.refNewLessonModal = ref;
          }}
          onPublish={this.onPublish}
        />
        <NewSynModal
          ref={ref => {
            this.refSynModal = ref;
          }}
          onPublish={this.onAddSyn}
        />
      </SafeAreaView>
    );
  }

  callBackAddModal = flag => {
    switch (flag) {
      case Strings.MODAL_FLAG_ADD_LESSON:
        this.refNewLessonModal.show();
        break;
      case Strings.MODAL_FLAG_ADD_SYN:
        this.refSynModal.show();
        break;
      default:
        break;
    }
  };

  onHeaderLocation = () => {
    if (this.refHomeHeader) {
      this.refHomeHeader.updateLocation("London, UK");
    }
  };
  onHeaderMenu = () => {
    this.props.navigation.openDrawer();
  };

  onSearch = () => {
    // I18nManager.forceRTL(false);
    // NativeModules.DevSettings.reload();
  };
  onAdd = () => {
    if (this.refAddModal) {
      this.refAddModal.show();
    }
  };
  onFilter = () => {
    if (this.refFilterModal) {
      this.refFilterModal.show();
    }
  };
  onDetails = () => {
    this.props.navigation.navigate("Details");
  };
  onPublish = () => {
    this.refNewLessonModal.hide();
  };
  onAddSyn = () => {
    this.refSynModal.hide();
  };
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
)(HomeScreen);
