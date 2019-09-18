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
    };
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    debugger;
    console.info(this.props.navigation.state.params.lessonData);
    this.setState({
      language: this.props.appSettings.language,
    });
    this.setState({
      comments: this.props.navigation.state.params.lessonData.comments,
    });
  }

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

  render() {
    const {language, showLoading, comments} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    const {lessonData} = this.props.navigation.state.params;
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
                      lessonData.speaker
                        ? {uri: lessonData.speaker.avatar}
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
                    Today, {lessonData.timeString}
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
                  text={isEnglish ? en.detail.like : he.detail.like}
                />
                <View style={styles.horizontalSpacing} />
                <CommentButton
                  text={isEnglish ? en.detail.comments : he.detail.comments}
                />
              </View>
              <View style={styles.likesContainer}>
                <Text style={styles.likesText}>
                  {`${lessonData.likes_count ? lessonData.likes_count : 0} `}
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
            onEndEditing={this.onComment}
          />
          <TouchableOpacity style={styles.commentSendView}>
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
          <Text>
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
    this.props.navigation.goBack();
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
  onEdit = () => {};
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
