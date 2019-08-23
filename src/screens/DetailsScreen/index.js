import React, { Component, Fragment } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Platform,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { styles } from "./styles";
import { appSettingsSelector } from "../../redux/selector";
import { AppSettingsActions } from "../../redux";
import { connect } from "react-redux";
import { DetailsHeader, LikeButton, CommentButton } from "../../components";
import { Comments } from "./Comments";
import { Colors } from "../../themes";

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
          <DetailsHeader
            onBack={this.onBack}
            onEdit={this.onEdit}
            onFavorite={this.onFavorite}
            onSend={this.onSend}
          />
          <KeyboardAvoidingView behavior="height" style={styles.flexFull}>
            <ScrollView keyboardShouldPersistTaps={"always"}>
              <View style={styles.detailBasicInfo}>
                <Text style={styles.detailTitleText}>
                  The Weekly Shiur - On the parasha
                </Text>
                <View style={styles.detailBasic}>
                  <View style={styles.detailUserContainer}>
                    <Image
                      source={require("../../assets/icon_avatar.png")}
                      style={styles.detailUserAvatar}
                    />
                    <View style={styles.userDetail}>
                      <Text style={styles.userRole}>Speaker</Text>
                      <Text style={styles.userName}>Silvan Radeh Meiv</Text>
                    </View>
                  </View>
                  <View style={styles.detailUserContainer}>
                    <Image
                      source={require("../../assets/icon_detail_building.png")}
                      style={styles.detailUserAvatar}
                    />
                    <View style={styles.userDetail}>
                      <Text style={styles.userRole}>Speaker</Text>
                      <Text style={styles.userName}>Silvan Radeh Meiv</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.detailClockLocation}>
                  <View style={styles.detailClockContainer}>
                    <Image
                      source={require("../../assets/icon_detail_clock.png")}
                      style={styles.detailClockImage}
                    />
                    <Text style={styles.detailClockText}>Today, 22:30</Text>
                  </View>
                  <View style={styles.detailLocationContainer}>
                    <Image
                      source={require("../../assets/icon_detail_location.png")}
                      style={styles.detailLocationImage}
                    />
                    <Text style={styles.detailLocationText}>
                      King George 58, Jerusalem
                    </Text>
                  </View>
                </View>
                <View style={styles.detailDescContainer}>
                  <Text style={styles.detailDescText}>
                    Sivan Rahav-Meir’s weekly shiur on the parasha takes place
                    in Jerusalem every Wednesday evening at 9:00 pm at “Heichal
                    Shlomo″, King George 58. Entrance is free.
                  </Text>
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.likeBtnContainer}>
                <View style={styles.buttonsContainer}>
                  <LikeButton />
                  <View style={styles.horizontalSpacing} />
                  <CommentButton />
                </View>
                <View style={styles.likesContainer}>
                  <Text style={styles.likesText}>43+ liked</Text>
                  <Image
                    source={require("../../assets/icon_detail_liked.png")}
                    style={styles.iconDetailLikedImage}
                  />
                </View>
              </View>
              <View style={styles.paddingSeparator} />
              <Comments />
              <View style={styles.commentInputView}>
                <TextInput
                  placeholder={"Type comment here..."}
                  style={styles.commentInputText}
                />
                <TouchableOpacity style={styles.commentSendView}>
                  <Image
                    source={require("../../assets/icon_detail_sendbtn.png")}
                    style={styles.commentSendImage}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
