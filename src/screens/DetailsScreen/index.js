import React, {Component, Fragment} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import {styles} from './styles';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';
import {
  DetailsHeader,
  LikeButton,
  CommentButton,
  Loading,
  AddModal,
} from '../../components';
import {Comments} from './Comments';
import {Colors} from '../../themes';
import {Strings, ApiRequest} from '../../utils';
import {en, he} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class DetailsScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };
  constructor(props) {
    super(props);
    this.state = {
      language: Strings.ENGLISH,
      commentText: '',
      showLoading: false,
      comments: [],
      isLike: false,
      likeCount: 0,
      lessonData: props.navigation.state.params.lessonData,
      isEdit: false,
    };
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({
      language: this.props.appSettings.language,
    });
    this.setState({
      comments: this.props.navigation.state.params.lessonData.comments,
      likeCount: this.props.navigation.state.params.lessonData.likes_count,
    });

    let likes = this.props.navigation.state.params.lessonData.likes;
    let isLike = false;
    if (likes) {
      likes.map(item => {
        if (item === Strings.userId) {
          isLike = true;
        }
      });
    }
    this.setState({isLike});
    console.log('Detail lesson didMount');
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('Detail getDerivedStateFromProps this.state', this.state);
  //   console.log('Detail getDerivedStateFromProps', nextProps, prevState);
  // }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentWillReceiveProps(nextProps, nextContext) {
    const originLanguage = this.props.appSettings.language;
    const newLanguage = nextProps.appSettings.language;
    if (originLanguage !== newLanguage) {
      this.setState({language: newLanguage});
    }
  }

  startLoading = () => {
    this.setState({showLoading: true});
  };

  closeLoading = () => {
    this.setState({showLoading: false});
  };

  onComment = () => {
    this.startLoading();
    let body = {
      lesson_id: this.props.navigation.state.params.lessonData._id,
      comment_body: this.state.commentText,
      date: new Date(),
    };
    ApiRequest('lesson/comment', body, 'POST')
      .then(response => {
        this.closeLoading();
        this.setState({commentText: ''});
        this.setState({comments: response.comments});
      })
      .catch(error => {
        this.closeLoading();
        this.setState({commentText: ''});
      });
  };

  onLike = () => {
    const {likeCount} = this.state;
    this.startLoading();
    let body = {
      lesson_id: this.props.navigation.state.params.lessonData._id,
    };
    ApiRequest('lesson/like', body, 'POST')
      .then(response => {
        this.closeLoading();
        this.setState({isLike: true, likeCount: likeCount + 1});
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  onDislike = () => {
    const {likeCount} = this.state;
    this.startLoading();
    let body = {
      lesson_id: this.props.navigation.state.params.lessonData._id,
    };
    ApiRequest('lesson/unlike', body, 'POST')
      .then(response => {
        this.closeLoading();
        this.setState({isLike: false, likeCount: likeCount - 1});
      })
      .catch(error => {
        this.closeLoading();
      });
  };

  onEditLesson = (
    lat,
    lng,
    city,
    address,
    subject,
    selectedSpeaker,
    speaker,
    note,
    contactName,
    phoneNumber,
    days,
    datetime,
    selectedAudience,
  ) => {
    const {lessonData} = this.state;
    let location = {
      // for test
      type: 'Point',
      coordinates: [lng, lat],
    };
    console.log('selectedSpeaker', selectedSpeaker);
    const newSpeaker = speaker
      ? {
          _id: speaker.value,
          name: speaker.label,
          avatar: speaker.avatar,
          about: speaker.about,
        }
      : lessonData.speaker;
    const {
      lessonData: {_id},
    } = this.props.navigation.state.params;
    console.log('edit lesson selectedSpeaker', selectedSpeaker);
    let body = {
      id: _id,
      speakerId:
        typeof selectedSpeaker === 'string'
          ? selectedSpeaker
          : selectedSpeaker.value,
      speaker: newSpeaker,
      synagogueId: '',
      lessonSubject: subject,
      location: location,

      // time: `${datetime.getHours()}:${datetime.getMinutes()}`,
      time:
        typeof datetime === 'string'
          ? datetime
          : `${datetime.getHours()}:${datetime.getMinutes()}`,
      days: days,
      audience: selectedAudience,
      notes: note,
      contact_name: contactName,
      contact_number: phoneNumber,
      address: address,
    };
    this.startLoading();
    console.log('edit lesson', body);
    ApiRequest('lesson/update', body, 'PUT')
      .then(response => {
        console.log('edit lesson response', response);
        const {lessonData} = this.state;
        this.setState({lessonData: {...lessonData, ...body}});
        this.closeLoading();
        this.setState({isEdit: true});
      })
      .catch(error => {
        console.log('edit lesson error', error);

        this.closeLoading();
      });
  };

  render() {
    const {
      language,
      showLoading,
      comments,
      isLike,
      likeCount,
      lessonData,
      isEdit,
    } = this.state;
    const isEnglish = language === Strings.ENGLISH;
    // const {lessonData} = this.props.navigation.state.params;
    // console.log('detail screen', lessonData);
    console.log('detail screen', isEdit);

    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={styles.topSafeAreaView} />
        <SafeAreaView style={styles.bottomSafeAreaView}>
          <DetailsHeader
            onBack={this.onBack}
            onEdit={this.onEdit}
            onFavorite={this.onFavorite}
            onSend={this.onSend}
          />

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'always'}
            style={styles.flexFull}>
            <View style={styles.detailBasicInfo}>
              <Text style={styles.detailTitleText}>
                {lessonData.lessonSubject}
              </Text>
              <View style={styles.detailBasic}>
                <View style={styles.detailUserContainer}>
                  <Image
                    source={
                      lessonData.speaker && lessonData.speaker.avatar
                        ? {
                            uri: `data:image/png;base64,${
                              lessonData.speaker.avatar
                            }`,
                          }
                        : require('../../assets/icon_avatar.png')
                    }
                    style={styles.detailUserAvatar}
                  />
                  <View style={styles.userDetail}>
                    <Text style={styles.userRole}>
                      {isEnglish ? en.modal.speaker : he.modal.speaker}
                    </Text>
                    <Text style={styles.userName}>
                      {lessonData.speaker ? lessonData.speaker.name : ''}
                    </Text>
                  </View>
                </View>
                <View style={styles.detailUserContainer}>
                  <Image
                    source={require('../../assets/icon_detail_building.png')}
                    style={styles.detailUserAvatar}
                  />
                  <View style={styles.userDetail}>
                    <Text style={styles.userRole}>
                      {isEnglish ? en.modal.synagogue : he.modal.synagogue}
                    </Text>
                    <Text style={styles.userName}>Silvan Radeh Meiv</Text>
                  </View>
                </View>
              </View>
              <View style={styles.detailClockLocation}>
                <View style={styles.detailClockContainer}>
                  <Image
                    source={require('../../assets/icon_detail_clock.png')}
                    style={styles.detailClockImage}
                  />
                  <Text style={styles.detailClockText}>
                    Today, {lessonData.time}
                  </Text>
                </View>
                <View style={styles.detailLocationContainer}>
                  <Image
                    source={require('../../assets/icon_detail_location.png')}
                    style={styles.detailLocationImage}
                  />
                  <Text style={styles.detailLocationText}>
                    {lessonData.address}
                  </Text>
                </View>
              </View>
              <View style={styles.detailDescContainer}>
                <Text style={styles.detailDescText}>
                  {lessonData.description}
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.likeBtnContainer}>
              <View style={styles.buttonsContainer}>
                <LikeButton
                  onPress={isLike ? this.onDislike : this.onLike}
                  text={
                    isEnglish
                      ? isLike
                        ? en.detail.unlike
                        : en.detail.like
                      : isLike
                      ? he.detail.unlike
                      : he.detail.like
                  }
                />
                <View style={styles.horizontalSpacing} />
                <CommentButton
                  text={isEnglish ? en.detail.comments : he.detail.comments}
                  onPress={() => {
                    this.refs.commentInput.focus();
                  }}
                />
              </View>
              <View style={styles.likesContainer}>
                <Text style={styles.likesText}>
                  {/* {`${lessonData.likes_count ? lessonData.likes_count : 0} `} */}
                  {`${likeCount} `}
                  {isEnglish ? en.detail.liked : he.detail.liked}
                </Text>
                <Image
                  source={require('../../assets/icon_detail_liked.png')}
                  style={styles.iconDetailLikedImage}
                />
              </View>
            </View>
            <View style={styles.paddingSeparator} />
            <Comments isEnglish={isEnglish} item={comments} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
        <View style={styles.commentInputView}>
          <TextInput
            placeholder={
              isEnglish ? en.detail.typeCommentHere : he.detail.typeCommentHere
            }
            style={styles.commentInputText}
            onChangeText={text => {
              this.setState({commentText: text});
            }}
            ref="commentInput"
            value={this.state.commentText}
          />
          <TouchableOpacity
            style={styles.commentSendView}
            onPress={this.onComment}>
            <Image
              source={require('../../assets/icon_detail_sendbtn.png')}
              style={styles.commentSendImage}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 30,
            backgroundColor: '#EDEFF1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: 'Heebo-Bold'}}>
            {isEnglish
              ? en.memorial.all_over_the_app
              : he.memorial.all_over_the_app}
          </Text>
        </View>
        {showLoading && <Loading />}
      </View>
    );
  }

  onBack = () => {
    const {isEdit} = this.state;
    if (isEdit) {
      this.props.navigation.navigate('Home', {
        isEdit,
      });
    } else {
      this.props.navigation.goBack();
    }
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

  onSend = () => {
    ApiRequest(
      'synagogue/favorite?synagogue_id=5d73e770166c9f52982d7cd0',
      {},
      'POST',
      '',
    )
      .then(response => {})
      .catch(error => {});
  };
  onFavorite = () => {
    this.props.navigation.navigate('Favorite');
  };
  onEdit = () => {
    // const {lessonData} = this.props.navigation.state.params;
    const {lessonData} = this.state;
    console.log('onEdit', lessonData);
    this.startLoading();
    ApiRequest('lesson/speakers')
      .then(response => {
        this.closeLoading();
        this.props.navigation.navigate('NewLesson', {
          speakers: response,
          isEdit: true,
          onEditLesson: this.onEditLesson,
          lessonData: lessonData,
        });
      })
      .catch(error => {
        this.closeLoading();
      });
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsScreen);
