import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import { Metric } from "../../themes";

export class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
  }

  componentDidMount() {
    this.setState({ location: "Jerusalem, Israel" });
  }

  onLocation = () => {
    this.props.onLocation();
  };

  onMenu = () => {
    this.props.onMenu();
  };

  updateLocation = location => {
    this.setState({ location });
  };

  render() {
    const { location } = this.state;
    return (
      <View style={styles.homeHeaderContainer}>
        <TouchableOpacity
          style={styles.homeHeaderLeftView}
          onPress={this.onLocation}
        >
          <View style={styles.homeHeaderLocationView}>
            <Image
              source={require("../../assets/icon_location_small.png")}
              style={styles.homeHeaderLocationImage}
            />
            <Text style={[Metric.font.h5, styles.homeHeaderLocationText]}>
              Location
            </Text>
          </View>
          <View style={styles.homeHeaderLocationNameView}>
            <Text style={Metric.font.h2}>{location}</Text>
            <Image
              source={require("../../assets/icon_bottom_arrow_small.png")}
              style={styles.homeHeaderLocationNameImage}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconMenuTouch} onPress={this.onMenu}>
          <Image
            source={require("../../assets/icon_menu.png")}
            style={styles.iconMenuImg}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export class DetailsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.detailsHeaderContainer}>
        <TouchableOpacity
          style={styles.detailsHeaderBackContainer}
          onPress={() => {
            this.props.onBack();
          }}
        >
          <View style={styles.detailsHeaderBackContainerOpacity} />
          <Image
            source={require("../../assets/icon_header_back.png")}
            style={styles.detailsHeaderBackIcon}
          />
        </TouchableOpacity>
        <View style={styles.detailsHeaderRightButtonsView}>
          <TouchableOpacity
            style={styles.detailsHeaderBackContainer}
            onPress={() => {
              this.props.onSend();
            }}
          >
            <View style={styles.detailsHeaderBackContainerOpacity} />
            <Image
              source={require("../../assets/icon_header_send.png")}
              style={styles.detailsHeaderSendIcon}
            />
          </TouchableOpacity>
          <View style={styles.horizontalSpacing} />
          <TouchableOpacity
            style={styles.detailsHeaderBackContainer}
            onPress={() => {
              this.props.onFavorite();
            }}
          >
            <View style={styles.detailsHeaderBackContainerOpacity} />
            <Image
              source={require("../../assets/icon_header_favorites.png")}
              style={styles.detailsHeaderFavoriteIcon}
            />
          </TouchableOpacity>
          <View style={styles.horizontalSpacing} />
          <TouchableOpacity
            style={styles.detailsHeaderBackContainer}
            onPress={() => {
              this.props.onEdit();
            }}
          >
            <View style={styles.detailsHeaderBackContainerOpacity} />
            <Image
              source={require("../../assets/icon_header_edit.png")}
              style={styles.detailsHeaderBackIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
