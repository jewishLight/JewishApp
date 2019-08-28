import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  I18nManager,
  NativeModules,
} from 'react-native';
import {styles} from './styles';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {HomeHeader} from '../../components';
import {AroundEvents} from '../HomeScreen/AroundEvents';
import {TodayLessons} from '../HomeScreen/TodayLessons';
import {PopularLessons} from '../HomeScreen/PopularLessons';
import {RecentLessons} from '../HomeScreen/RecentLessons';
import {LocalStorage} from '../../utils';

class SettingsScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.appSettings.language !== nextProps.appSettings.language) {
      this.setState({language: nextProps.appSettings.language});
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
      </SafeAreaView>
    );
  }

  onHeaderLocation = () => {
    if (this.refHomeHeader) {
      this.refHomeHeader.updateLocation('London, UK');
    }
  };
  onHeaderMenu = () => {
    this.props.navigation.openDrawer();
  };
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
)(SettingsScreen);
