import React, {Component} from 'react';
import {NavigationActions, SafeAreaView, StackActions} from 'react-navigation';
import {
  View,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  I18nManager,
  NativeModules,
  BackHandler,
} from 'react-native';
import {styles} from './styles';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {en, he} from '../../constants';
import {
  HomeHeader,
  SearchButton,
  AddButton,
  FilterButton,
  AddModal,
  FilterModal,
  NewLessonModal,
  NewSynModal,
  ChangeLocationModal,
} from '../../components';
import {AroundEvents} from './AroundEvents';
import {TodayLessons} from './TodayLessons';
import {PopularLessons} from './PopularLessons';
import {RecentLessons} from './RecentLessons';
import {Strings, LocalStorage} from '../../utils';

class HomeScreen extends Component {
  // static navigationOptions = {
  //   gesturesEnabled: Platform.OS !== 'ios',
  // };
  constructor(props) {
    super(props);
    this.state = {
      language: '',
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    let language = this.props.appSettings.language;
    this.setState({language});
    if (this.refHomeHeader) {
      this.refHomeHeader.updateLanguage(language);
    }
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  async componentWillReceiveProps(nextProps, nextContext) {
    const originLanguage = this.props.appSettings.language;
    const newLanguage = nextProps.appSettings.language;
    if (originLanguage !== newLanguage) {
      this.setState({language: newLanguage});
      if (this.refHomeHeader) {
        this.refHomeHeader.updateLanguage(newLanguage);
      }
    }
  }

  render() {
    const {language} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <View>
            <HomeHeader
              onLocation={this.onHeaderLocation}
              onMenu={this.onHeaderMenu}
              ref={ref => {
                this.refHomeHeader = ref;
              }}
              language={language}
              locationText={isEnglish ? en.home.location : he.home.location}
            />
          </View>
          <View style={styles.buttonsLine}>
            <FilterButton onPress={this.onFilter} />
            <View style={styles.addSearchLine}>
              <AddButton
                onPress={this.onAdd}
                text={isEnglish ? en.home.add : he.home.add}
              />
              <View style={styles.horizontalSpacing} />
              <SearchButton
                onPress={this.onSearch}
                text={isEnglish ? en.home.search : he.home.search}
              />
            </View>
          </View>
          <ScrollView>
            <AroundEvents onDetails={this.onDetails} isEnglish={isEnglish} />
            <TodayLessons onDetails={this.onDetails} isEnglish={isEnglish} />
            <PopularLessons onDetails={this.onDetails} isEnglish={isEnglish} />
            <RecentLessons onDetails={this.onDetails} isEnglish={isEnglish} />
          </ScrollView>
          <AddModal
            ref={ref => {
              this.refAddModal = ref;
            }}
            callBack={this.callBackAddModal}
            isEnglish={isEnglish}
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
            onPublish={this.onAddLesson}
            direction={language === Strings.ENGLISH ? 'ltr' : 'rtl'}
            isEnglish={isEnglish}
          />
          <NewSynModal
            ref={ref => {
              this.refSynModal = ref;
            }}
            onPublish={this.onAddSyn}
            direction={language === Strings.ENGLISH ? 'ltr' : 'rtl'}
            isEnglish={isEnglish}
          />
          <ChangeLocationModal
            ref={ref => {
              this.refChangeLocationModal = ref;
            }}
            onSelectLocation={this.onSelectLocation}
            isEnglish={isEnglish}
          />
        </View>
        <View style={{height: 30, backgroundColor: 'black'}} />
      </SafeAreaView>
    );
  }

  onSelectLocation = (index, name) => {};

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
    // if (this.refHomeHeader) {
    //   this.refHomeHeader.updateLocation('London, UK');
    // }
    this.refChangeLocationModal.show();
  };
  onHeaderMenu = () => {
    this.props.navigation.openDrawer();
  };

  onSearch = () => {
    this.props.navigation.navigate('Search');
    // this.props.navigation.dispatch(
    //   StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({routeName: 'Login'})],
    //   }),
    // );
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
    this.props.navigation.navigate('Details');
  };
  onAddLesson = () => {
    this.refNewLessonModal.hide();
  };
  onAddSyn = (lat, lng, city, name) => {
    this.refSynModal.hide();
    console.info('name', name);
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
)(HomeScreen);
