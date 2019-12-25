import React, {Component} from 'react';
import {SafeAreaView} from 'react-navigation';
import {
  View,
  Platform,
  BackHandler,
  Text,
  Image,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import {Colors, Metric} from '../../themes';
import {LocalStorage, Strings} from '../../utils';
import {en, he} from '../../constants';
import {MyProfileHeader, SearchResultHeader} from '../../components';
import {appSettingsSelector} from '../../redux/selector';
import {AppSettingsActions} from '../../redux';
import {connect} from 'react-redux';

class EditProfileScreen extends Component {

    static navigationOptions = {
    gesturesEnabled: Platform.OS !== 'ios',
    };

    constructor(props) {
        super(props);
        this.state = {
            language: '',
            name:'',
            email:'',
        };
        }

    onBack = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.setState({language: this.props.appSettings.language});
      }
    
      componentWillUnmount(): void {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

    async componentWillReceiveProps(nextProps, nextContext) {
        const originLanguage = this.props.appSettings.language;
        const newLanguage = nextProps.appSettings.language;
        if (originLanguage !== newLanguage) {
          this.setState({language: newLanguage});
        }
      }
    
    handleBackButton = () => {
        return true;
      };
    
    onBack = () => {
    this.props.navigation.goBack();
    };

    onChangeName = text => {
        this.setState({name: text});
      };

      onChangeEmail = text => {
        this.setState({email: text});
      };

    render() {
        const {language} = this.state;
        const isEnglish = language === Strings.ENGLISH;

        return (
          <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>

            <NormalInput
            direction={this.props.direction}
            placeholder={
              isEnglish
                ? en.profile.enterNewNameHere
                : he.profile.enterNewNameHere
            }
            onChangeText={this.onChangename}
          />
          <NormalInput
              direction={this.props.direction}
              placeholder={
                isEnglish
                  ? en.profile.enterNewEmailHere
                  : he.profile.enterNewEmailHere
              }
              onChangeText={this.onChangeEmail}
            />
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
      )(NewLessonScreen);