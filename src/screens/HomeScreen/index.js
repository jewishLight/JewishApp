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
  Alert,
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
  ChangeLocationModal,
  Loading,
} from '../../components';
import {AroundEvents} from './AroundEvents';
import {TodayLessons} from './TodayLessons';
import {PopularLessons} from './PopularLessons';
import {RecentLessons} from './RecentLessons';
import {Strings, LocalStorage, ApiRequest} from '../../utils';
import NetInfo from '@react-native-community/netinfo';
import Share from 'react-native-share';

class HomeScreen extends Component {
  // static navigationOptions = {
  //   gesturesEnabled: Platform.OS !== 'ios',
  // };
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      showLoading: false,
      todayLessons: [],
      popularLessons: [],
      recentLessons: [],
      aroundEvents: [],
    };
  }

  startLoading = () => {
    this.setState({showLoading: true});
  };
  closeLoading = () => {
    this.setState({showLoading: false});
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    let language = this.props.appSettings.language;
    this.setState({language});
    if (this.refHomeHeader) {
      this.refHomeHeader.updateLanguage(language);
    }

    this.checkNetworkStatus(language);
    this.fetchHome();
  }

  checkNetworkStatus = language => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'Warning',
          language === Strings.ENGLISH
            ? 'There is not interetnet connection, please try again later.'
            : 'אין חיבור לאינטרנט אנא נסו שוב מאוחר יותר.',
          [
            {
              text: 'Try again',
              onPress: () => {
                this.checkNetworkStatus(language);
              },
            },
            {
              text: 'Close',
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  fetchHome = () => {
    this.startLoading();

    const fetchTodayLessons = new Promise((resolve, reject) => {
      ApiRequest('home/today_lessons')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });

    const fetchPopularLessons = new Promise((resolve, reject) => {
      ApiRequest('home/popular_lessons')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });

    const fetchRecentLessons = new Promise((resolve, reject) => {
      ApiRequest('home/recent')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });

    const fetchAroundCity = new Promise((resolve, reject) => {
      console.log(Strings.currentLongitude, Strings.currentLatitude)
      ApiRequest(
        'home/around_city',
        {lon: Strings.currentLongitude, lat: Strings.currentLatitude},
        'POST',
      )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });

    Promise.all([
      fetchTodayLessons.catch(error => {
        this.setState({
          todayLessons: [],
        });
        this.closeLoading();
      }),
      fetchPopularLessons.catch(error => {
        this.setState({
          popularLessons: [],
        });
        this.closeLoading();
      }),
      fetchRecentLessons.catch(error => {
        this.setState({
          recentLessons: [],
        });
        this.closeLoading();
      }),
      fetchAroundCity.catch(error => {
        this.setState({aroundEvents: []});
        this.closeLoading();
      }),
    ]).then(responses => {
      console.info(Strings.userId);
      this.setState({
        todayLessons: responses[0],
        popularLessons: responses[1],
        recentLessons: responses[2],
        aroundEvents: responses[3],
      });
      this.closeLoading();
    });
  };

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
    const {
      language,
      showLoading,
      todayLessons,
      aroundEvents,
      popularLessons,
      recentLessons,
    } = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <View>
            <HomeHeader
              onLocation={this.onHeaderLocation}
              onMenu={this.onHeaderMenu}
              location={Strings.currentOnlyCity}
              ref={ref => {
                this.refHomeHeader = ref;
              }}
              language={language}
              locationText={isEnglish ? en.home.location : he.home.location}
            />
          </View>
          <View style={styles.buttonsLine}>
            {Strings.APP_VERSION > 1 ? (
              <FilterButton onPress={this.onFilter} />
            ) : (
              <View />
            )}

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
            <AroundEvents
              onDetails={this.onDetails}
              isEnglish={isEnglish}
              aroundEvents={aroundEvents}
            />
            <TodayLessons
              onDetails={this.onDetails}
              isEnglish={isEnglish}
              todayLessons={todayLessons}
            />
            <PopularLessons
              onDetails={this.onDetails}
              isEnglish={isEnglish}
              todayLessons={popularLessons}
            />
            <RecentLessons
              onDetails={this.onDetails}
              isEnglish={isEnglish}
              todayLessons={recentLessons}
            />
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
          <ChangeLocationModal
            ref={ref => {
              this.refChangeLocationModal = ref;
            }}
            onSelectLocation={this.onSelectLocation}
            isEnglish={isEnglish}
          />
        </View>
        <View
          style={{
            height: 30,
            backgroundColor: '#EDEFF1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>
            {isEnglish
              ? en.memorial.all_over_the_app
              : he.memorial.all_over_the_app}
          </Text>
        </View>
        {showLoading && <Loading />}
      </SafeAreaView>
    );
  }

  onSelectLocation = (index, name) => {};

  callBackAddModal = flag => {
    switch (flag) {
      case Strings.MODAL_FLAG_ADD_LESSON:
        this.startLoading();
        ApiRequest('lesson/speakers')
          .then(response => {
            this.closeLoading();
            this.props.navigation.navigate('NewLesson', {
              speakers: response,
              onPublish: this.onAddLesson,
            });
          })
          .catch(error => {
            this.closeLoading();
          });
        break;
      case Strings.MODAL_FLAG_ADD_SYN:
        this.props.navigation.navigate('SearchSyna', {
          isEnglish: this.state.language === Strings.ENGLISH,
          onSyna: this.onSynaAdd,
          goSyna: this.goSynaDetail,
        });
        break;
      default:
        break;
    }
  };

  onSynaAdd = () => {
    this.props.navigation.navigate('NewSyna', {
      onPublish: this.onAddSyn,
      isEnglish: this.state.language === Strings.ENGLISH,
    });
  };

  goSynaDetail = synaId => {
    this.startLoading();
    ApiRequest(`synagogue/view?id=${synaId}`)
      .then(response => {
        this.closeLoading();
        this.props.navigation.navigate('Syna', {
          synaData: response,
        });
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  onHeaderLocation = () => {
    // if (this.refHomeHeader) {
    //   this.refHomeHeader.updateLocation('London, UK');
    // }
    // this.refChangeLocationModal.show();
    this.props.navigation.navigate('ChangeLocation', {
      isEnglish: this.state.language === Strings.ENGLISH,
      updateLocation: this.updateLocation,
    });
  };

  updateLocation = (lat, lng, city) => {
    if (this.refHomeHeader) {
      this.refHomeHeader.updateLocation(city);
    }
    Strings.currentLatitude = parseFloat(lat);
    Strings.currentLongitude = parseFloat(lng);
  };
  onHeaderMenu = () => {
    this.props.navigation.openDrawer();
  };

  onSearch = () => {
    this.startLoading();
    ApiRequest(`search`)
      .then(response => {
        this.closeLoading();
        this.props.navigation.navigate('Search', {searchHistory: response});
      })
      .catch(error => {
        this.closeLoading();
      });
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
  onDetails = lessonId => {
    this.startLoading();
    ApiRequest(`lesson/view?id=${lessonId}`)
      .then(response => {
        this.closeLoading();
        this.props.navigation.navigate('Details', {lessonData: response});
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  onAddLesson = (
    lat,
    lng,
    city,
    subject,
    selectedSpeaker,
    note,
    contactName,
    phoneNumber,
    days,
    datetime,
    selectedAudience,
  ) => {
    let location = {
      // for test
      type: 'Point',
      coordinates: [35.217018, 31.771959],
    };

    let body = {
      speakerId: selectedSpeaker,
      synagogueId: '',
      lessonSubject: subject,
      location: location,
      time: `${datetime.getHours()}:${datetime.getMinutes()}`,
      days: days,
      audience: selectedAudience,
      notes: note,
      contact_name: contactName,
      contact_number: phoneNumber,
    };
    this.startLoading();
    ApiRequest('lesson/add', body, 'POST')
      .then(response => {
        this.closeLoading();
        this.fetchHome();
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  onAddSyn = (
    lat,
    lng,
    city,
    name,
    nosach,
    shtiblach,
    amenities_key,
    date,
    mon,
    tue,
    wed,
    thu,
    fri,
    sat,
    sun,
    note,
    phoneNumber,
    avatarSource,
  ) => {
    if (lat === 0 || lng === 0 || city === '') {
      alert(
        this.state.language === Strings.ENGLISH
          ? 'Please input the location'
          : 'נא להזין כתובת תקינה',
      );
    } else if (name === '') {
      alert('Please input the name');
    } else if (nosach === '') {
      alert('Please input the nosach');
    } else if (phoneNumber === '') {
      alert('Please input the phone number');
    } else if (note === '') {
      alert('Please input the note');
    } else {
      this.startLoading();

      let n = '';
      switch (nosach) {
        case 0:
          n = en.nosach.value_0;
          break;
        case 1:
          n = en.nosach.value_1;
          break;
        case 2:
          n = en.nosach.value_2;
          break;
        case 3:
          n = en.nosach.value_3;
          break;
        case 4:
          n = en.nosach.value_4;
          break;
        case 5:
          n = en.nosach.value_5;
          break;
        default:
          n = en.nosach.value_0;
          break;
      }

      let amenities = {};
      if (amenities_key.includes(0)) {
        amenities.seferTorah = true;
      }
      if (amenities_key.includes(1)) {
        amenities.disabledAccess = true;
      }
      if (amenities_key.includes(2)) {
        amenities.parking = true;
      }
      if (amenities_key.includes(3)) {
        amenities.womenSection = true;
      }
      amenities = JSON.stringify(amenities);

      let days = [];
      if (mon) {
        days.push(0);
      }
      if (tue) {
        days.push(1);
      }
      if (wed) {
        days.push(2);
      }
      if (thu) {
        days.push(3);
      }
      if (fri) {
        days.push(4);
      }
      if (sat) {
        days.push(5);
      }
      if (sun) {
        days.push(6);
      }

      let time = `${date.getHours()}:${date.getMinutes()}`;

      let location = JSON.stringify({
        // for test
        type: 'Point',
        coordinates: [35.217018, 31.771959],
      });
      let mikve = JSON.stringify({mikve: shtiblach});
      let minyans = JSON.stringify([
        {
          minyan: '1',
          timeType: 'exact',
          days: days,
          time: time,
        },
      ]);

      let url = 'http://ec609136.ngrok.io/synagogue/add';

      let body = {
        name: name,
        nosach: nosach,
        address: city,
        location: location,
        externals: amenities,
        minyans: minyans,
        notes: note,
        phone_number: phoneNumber,
        image: avatarSource.uri,
        donation_link: 'paypal',
        shtiblach: shtiblach,
      };

      ApiRequest(url, body, 'POST')
        .then(response => {
          this.closeLoading();
        })
        .catch(error => {
          this.closeLoading();
        });
    }
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
