import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  SynaHeader,
  AmView,
  TimeTagView,
  LikeButton,
  CommentButton,
  ChangeLocationModal,
} from '../../components';
import {Metric, Colors} from '../../themes';
import {styles} from './styles';
import Swiper from 'react-native-swiper';
import {Comments} from './Comments';
import {en, he} from '../../constants';
import {Strings} from '../../utils';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';

class SynaScreen extends Component {
  static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
  };

  constructor(props) {
    super(props);
    this.state = {language: Strings.ENGLISH};
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({language: this.props.appSettings.language});
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return true;
  };

  async componentWillReceiveProps(nextProps, nextContext) {
    const originLanguage = this.props.appSettings.language;
    const newLanguage = nextProps.appSettings.language;
    if (originLanguage !== newLanguage) {
      this.setState({language: newLanguage});
    }
  }

  onBack = () => {
    this.props.navigation.goBack();
  };
  onFavorite = () => {
    this.props.navigation.navigate('Favorite');
  };
  onShare = () => {};
  onEdit = () => {};
  onSend = () => {};

  render() {
    const {language} = this.state;
    const isEnglish = language === Strings.ENGLISH;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <SynaHeader
            onBack={this.onBack}
            onFavorite={this.onFavorite}
            onShare={this.onShare}
            onEdit={this.onEdit}
            onSend={this.onSend}
            isEnglish={isEnglish}
          />
          <ScrollView>
            <Swiper
              style={styles.wrapper}
              width={Metric.width}
              height={250}
              dotColor={'white'}
              activeDotColor={'gray'}
              showsButtons={false}>
              <View style={styles.slide1}>
                <Image
                  source={require('../../assets/swiper_1.jpg')}
                  style={{height: 250, resizeMode: 'contain'}}
                />
              </View>
              <View style={styles.slide2}>
                <Image
                  source={require('../../assets/swiper_2.jpg')}
                  style={{height: 250, resizeMode: 'contain'}}
                />
              </View>
              <View style={styles.slide3}>
                <Image
                  source={require('../../assets/swiper_3.jpeg')}
                  style={{height: 250, resizeMode: 'cover'}}
                />
              </View>
            </Swiper>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text style={{color: '#333333', fontSize: 24}}>
                  Magen David
                </Text>
                <Text style={{color: '#999999', fontSize: 12, marginTop: 15}}>
                  Nosach
                </Text>
                <Text style={{color: '#4c4c4c', fontSize: 14}}>
                  Magen David
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                  }}>
                  <Image
                    source={require('../../assets/icon_syna_location.png')}
                    style={{width: 12, height: 16, resizeMode: 'contain'}}
                  />
                  <Text style={{color: '#333333', fontSize: 14, marginLeft: 5}}>
                    King George 58, Jerusalem
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 130,
                    height: 46,
                    backgroundColor: Colors.primary,
                    borderRadius: 23,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 15,
                  }}>
                  <Image
                    source={require('../../assets/icon_syna_donate.png')}
                    style={{width: 18, height: 18, resizeMode: 'contain'}}
                  />
                  <Text style={{color: 'white', fontSize: 14, marginLeft: 10}}>
                    Donate
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 150,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#999999', fontSize: 12, marginTop: 15}}>
                  {isEnglish
                    ? en.synagogue.lastUpdated
                    : he.synagogue.lastUpdated}
                </Text>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: Colors.primary,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'white', fontSize: 14}}>
                    20 {isEnglish ? en.synagogue.days : he.synagogue.days}
                  </Text>
                  <Text style={{color: 'white', fontSize: 14}}>
                    {isEnglish ? en.synagogue.ago : he.synagogue.ago}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.separator, {marginTop: 15}]} />
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
              }}>
              <Text style={{color: 'black', fontSize: 16}}>
                {isEnglish ? en.modal.amenities : he.modal.amenities}
              </Text>
              <AmView />
              <Text style={{color: '#9B9B9B', fontSize: 15, marginTop: 10}}>
                Our distinctive Sephardic character is a source of pride for us,
                but membership in MDSC is not exclusive. Visitors may hear not
                only “Welcome” but “Bienvenue” and “Bienvenidos” – and from our
                many Israeli members, a hearty “Shalom”...
              </Text>
              <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>
                {isEnglish
                  ? en.synagogue.minamynTimes
                  : he.synagogue.minamynTimes}
              </Text>
              <TimeTagView />
              <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>
                {isEnglish
                  ? en.synagogue.lessonsTimes
                  : he.synagogue.lessonsTimes}
              </Text>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: '#ededef',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#4B5461', fontSize: 14}}>
                      Sivan Rahav Meir
                    </Text>
                    <Text style={{color: '#4B5461', fontSize: 12}}>
                      Big hall, first Door
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/icon_syna_document.png')}
                      style={{width: 12, height: 13, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{color: '#9B9B9B', fontSize: 12, marginLeft: 5}}>
                      11
                    </Text>
                    <Image
                      source={require('../../assets/icon_syna_like.png')}
                      style={{
                        width: 12,
                        height: 10,
                        resizeMode: 'contain',
                        marginLeft: 10,
                      }}
                    />
                    <Text
                      style={{color: '#9B9B9B', fontSize: 12, marginLeft: 5}}>
                      23
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/icon_syna_calendar.png')}
                      style={{width: 12, height: 12, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{color: '#4B5461', fontSize: 14, marginLeft: 5}}>
                      Friday, Saturday, Sunday
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#EC4256', fontSize: 12}}>08:00</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.separator, {marginTop: 15}]} />
            <View style={styles.likeBtnContainer}>
              <View style={styles.buttonsContainer}>
                <CommentButton
                  text={isEnglish ? en.detail.comments : he.detail.comments}
                />
              </View>
              <View style={styles.likesContainer}>
                <Text style={styles.likesText}>
                  43+ {isEnglish ? en.detail.liked : he.detail.liked}
                </Text>
                <Image
                  source={require('../../assets/icon_detail_liked.png')}
                  style={styles.iconDetailLikedImage}
                />
              </View>
            </View>
            <View style={styles.paddingSeparator} />
            <Comments isEnglish={isEnglish} />
            <View style={styles.commentInputView}>
              <TextInput
                placeholder={
                  isEnglish
                    ? en.detail.typeCommentHere
                    : he.detail.typeCommentHere
                }
                style={styles.commentInputText}
              />
              <TouchableOpacity style={styles.commentSendView}>
                <Image
                  source={require('../../assets/icon_detail_sendbtn.png')}
                  style={styles.commentSendImage}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
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
      </SafeAreaView>
    );
  }
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
)(SynaScreen);
