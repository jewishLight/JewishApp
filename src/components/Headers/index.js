import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {styles} from './styles';
import {Metric, Colors} from '../../themes';

export class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      language: '',
    };
  }

  componentDidMount() {
    console.info('language = ', this.props.language);
    this.setState({
      location: 'Jerusalem, Israel',
      language: this.props.language,
    });
  }

  onLocation = () => {
    this.props.onLocation();
  };

  updateLanguage = language => {
    this.setState({language});
  };

  onMenu = () => {
    this.props.onMenu();
  };

  updateLocation = location => {
    // this.setState({ location });
  };

  render() {
    const {location, language} = this.state;
    return (
      <View style={styles.homeHeaderContainer}>
        <TouchableOpacity
          style={styles.homeHeaderLeftView}
          onPress={this.onLocation}>
          <View style={styles.homeHeaderLocationView}>
            <Image
              source={require('../../assets/icon_location_small.png')}
              style={styles.homeHeaderLocationImage}
            />
            <Text style={[Metric.font.h5, styles.homeHeaderLocationText]}>
              Location
            </Text>
          </View>
          <View style={styles.homeHeaderLocationNameView}>
            <Text style={Metric.font.h2}>{location}</Text>
            <Image
              source={require('../../assets/icon_bottom_arrow_small.png')}
              style={styles.homeHeaderLocationNameImage}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={
              language === 'English'
                ? require('../../assets/icon_flag_usa.png')
                : require('../../assets/icon_flag_israel.png')
            }
            style={styles.iconMenuImg}
          />
          <TouchableOpacity style={styles.iconMenuTouch} onPress={this.onMenu}>
            <Image
              source={require('../../assets/icon_menu.png')}
              style={styles.iconMenuImg}
            />
          </TouchableOpacity>
        </View>
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
          }}>
          <View style={styles.detailsHeaderBackContainerOpacity} />
          <Image
            source={require('../../assets/icon_header_back.png')}
            style={styles.detailsHeaderBackIcon}
          />
        </TouchableOpacity>
        <View style={styles.detailsHeaderRightButtonsView}>
          <TouchableOpacity
            style={styles.detailsHeaderBackContainer}
            onPress={() => {
              this.props.onSend();
            }}>
            <View style={styles.detailsHeaderBackContainerOpacity} />
            <Image
              source={require('../../assets/icon_header_send.png')}
              style={styles.detailsHeaderSendIcon}
            />
          </TouchableOpacity>
          <View style={styles.horizontalSpacing} />
          <TouchableOpacity
            style={styles.detailsHeaderBackContainer}
            onPress={() => {
              this.props.onFavorite();
            }}>
            <View style={styles.detailsHeaderBackContainerOpacity} />
            <Image
              source={require('../../assets/icon_header_favorites.png')}
              style={styles.detailsHeaderFavoriteIcon}
            />
          </TouchableOpacity>
          <View style={styles.horizontalSpacing} />
          <TouchableOpacity
            style={styles.detailsHeaderBackContainer}
            onPress={() => {
              this.props.onEdit();
            }}>
            <View style={styles.detailsHeaderBackContainerOpacity} />
            <Image
              source={require('../../assets/icon_header_edit.png')}
              style={styles.detailsHeaderBackIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.searchHeaderContainer}>
        <TouchableOpacity
          style={styles.searchHeaderBackContainer}
          onPress={() => {
            this.props.onBack();
          }}>
          <Image
            source={require('../../assets/icon_search_back.png')}
            style={styles.searchHeaderBackIcon}
          />
          <Text style={styles.searchHeaderText}>Search History</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
