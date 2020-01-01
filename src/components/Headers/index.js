import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {styles} from './styles';
import {Metric, Colors} from '../../themes';
import {Strings} from '../../utils';
import {en, he} from '../../constants';

export class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      language: '',
    };
  }

  componentDidMount() {
    this.setState({
      location: this.props.location,
      language: this.props.language,
    });
    // alert(this.props.language);
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
    this.setState({location});
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
              {this.props.locationText}
            </Text>
          </View>
          <View style={styles.homeHeaderLocationNameView}>
            <Text style={Metric.font.h4}>{location}</Text>
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
              language === Strings.ENGLISH
                ? require('../../assets/icon_flag_usa.png')
                : require('../../assets/icon_flag_israel.png')
            }
            style={styles.iconMenuImg}
          />
          <TouchableOpacity style={styles.iconMenuTouch} onPress={this.onMenu}>
            <Image
              source={
                language === Strings.ENGLISH
                  ? require('../../assets/icon_menu.png')
                  : require('../../assets/icon_menu_rtl.png')
              }
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
    const isEnglish = this.props.isEnglish;
    return (
      <View style={styles.searchHeaderContainer}>
      <View>
        <TouchableOpacity
          style={styles.searchHeaderBackContainer}
          onPress={() => {
            this.props.onBack();
          }}>
          <Image
            source={
             // isEnglish
                 require('../../assets/icon_search_back.png')
             //   : require('../../assets/icon_search_back_hebrew.png')
             
            }
            style={styles.searchHeaderBackIcon}
          />
          
        </TouchableOpacity>
        <Text style={styles.searchHeaderText}>
            {isEnglish
              ? en.searchHistory.searchHistory
              : he.searchHistory.searchHistory}
          </Text>
     </View>

        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'gainsboro',
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            this.props.onClear();
          }}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class SearchResultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <View style={styles.searchHeaderContainer}>
        <View style={styles.searchHeaderBackContainer}>
          <TouchableOpacity onPress={() => {
            this.props.onBack();
          }}>
          <Image
            source={
              isEnglish
                ? require('../../assets/icon_search_back.png')
                : require('../../assets/icon_search_back_hebrew.png')
            }
            style={styles.searchHeaderBackIcon}
          />
          </TouchableOpacity>
          <Text style={styles.searchHeaderText}>
            {isEnglish ? en.searchResult.newSearch : he.searchResult.newSearch}
          </Text>
        </View>
       
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 30,
            bottom: 30,
            paddingHorizontal: 20,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            this.props.onMapView();
          }}>
          <Image
            source={require('../../assets/icon_search_header_mapview.png')}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
          <Text style={{color: 'white', marginLeft: 5}}>
            {isEnglish ? en.searchResult.mapView : he.searchResult.mapView}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class FilterHeader extends Component {
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
            source={require('../../assets/icon_header_filter_cancel.png')}
            style={styles.filterHeaderBackIcon}
          />
          <Text style={styles.searchHeaderText}>
            {this.props.isEnglish ? en.modal.filter : he.modal.filter}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class SynaHeader extends Component {
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
            source={
              this.props.isEnglish
                ? require('../../assets/icon_header_back.png')
                : require('../../assets/icon_header_back_he.png')
            }
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
              source={require('../../assets/icon_header_favorites_white.png')}
              style={styles.detailsHeaderFavoriteIcon}
            />
          </TouchableOpacity>
          <View style={styles.horizontalSpacing} />
          <TouchableOpacity
            style={styles.detailsHeaderBackContainer}
            onPress={() => {
              this.props.onShare();
            }}>
            <View style={styles.detailsHeaderBackContainerOpacity} />
            <Image
              source={require('../../assets/icon_header_share.png')}
              style={styles.synaHeaderShareIcon}
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

export class FavoriteHeader extends Component {
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
            source={require('../../assets/icon_header_filter_cancel.png')}
            style={styles.filterHeaderBackIcon}
          />
          <Text style={styles.searchHeaderText}>Favorite</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class MapViewHeader extends Component {
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
            source={require('../../assets/icon_header_filter_cancel.png')}
            style={styles.filterHeaderBackIcon}
          />
          <Text style={styles.searchHeaderText}>MapView</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class MyProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isEnglish = this.props.isEnglish;
    return (
      <View style={styles.searchHeaderContainer}>
        <View>
          <TouchableOpacity
            style={styles.searchHeaderBackContainer}
            onPress={() => {
              this.props.onBack();
            }}>
            <Image
              source={
                require('../../assets/icon_search_back.png')
              }
              style={styles.searchHeaderBackIcon}
          />
          </TouchableOpacity>
          <Text style={styles.searchHeaderText}>My Profile</Text>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 30,
            bottom: 30,
            paddingHorizontal: 20,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            this.props.onEdit();
          }}>
          <Text style={{color: 'white'}}>Edit Profile</Text>
          <Image
            source={require('../../assets/icon_myprofile_edit.png')}
            style={{
              width: 15,
              height: 15,
              resizeMode: 'contain',
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
