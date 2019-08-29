import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Switch,
  Platform,
} from 'react-native';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {Colors, Metric, Strings} from '../../themes';
import {AddModalCloseButton} from '../../components';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';

export class NormalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{}}>
        <TextInput
          style={[
            styles.newLessonSubjectTextInput,
            this.props.direction === 'rtl'
              ? {textAlign: 'right'}
              : {textAlign: 'left'},
          ]}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

export class NormalPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{marginTop: 10}}>
        <RNPickerSelect
          style={
            this.props.direction === 'rtl'
              ? {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'right', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'right',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
              : {
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    color: 'black',
                    paddingRight: 40, //
                    textAlign: 'left', // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: 'purple',
                    borderRadius: 8,
                    color: 'black',
                    paddingRight: 40, // to ensure the text is never behind the icon
                    textAlign: 'left',
                  },
                  iconContainer: {
                    right: 10,
                  },
                }
          }
          onValueChange={value => console.log(value)}
          items={[
            {label: 'Football', value: 'football'},
            {label: 'Baseball', value: 'baseball'},
            {label: 'Hockey', value: 'hockey'},
          ]}
          useNativeAndroidPickerStyle={false}
        />
        <Image
          source={require('../../assets/icon_add_modal_picker_downarrow.png')}
          style={{
            width: 15,
            height: 15,
            resizeMode: 'contain',
            position: 'absolute',
            right: 15,
            top: 13,
          }}
        />
      </View>
    );
  }
}

export class LocationInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{}}>
        <TextInput
          style={[
            styles.newLessonSubjectTextInput,
            this.props.direction === 'rtl'
              ? {textAlign: 'right'}
              : {textAlign: 'left'},
          ]}
          placeholder={'Enter location...'}
        />
        <Image
          source={require('../../assets/icon_modal_location_input.png')}
          style={{
            width: 21,
            height: 27,
            resizeMode: 'contain',
            position: 'absolute',
            right: 10,
            top: 20,
          }}
        />
      </View>
    );
  }
}

export class DateTimeSetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    };
  }

  componentDidMount() {
    this.setState({
      mon: this.props.mon,
      tue: this.props.tue,
      wed: this.props.wed,
      thu: this.props.thu,
      fri: this.props.fri,
      sat: this.props.sat,
      sun: this.props.sun,
    });
  }

  render() {
    const {mon, tue, wed, thu, fri, sat, sun} = this.state;
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Colors.lessonLightText,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>Set Days</Text>
          <Text style={{fontSize: 12, color: Colors.lessonLightText}}>
            Weekly recurrence
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({mon: !mon});
            }}>
            <View
              style={
                mon
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>Mon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({tue: !tue});
            }}>
            <View
              style={
                tue
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>Tue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({wed: !wed});
            }}>
            <View
              style={
                wed
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>Wed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({thu: !thu});
            }}>
            <View
              style={
                thu
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>Thu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({fri: !fri});
            }}>
            <View
              style={
                fri
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>Fri</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({sat: !sat});
            }}>
            <View
              style={
                sat
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>Sat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({sun: !sun});
            }}>
            <View
              style={
                sun
                  ? styles.newLessonModalDaySelected
                  : styles.newLessonModalDayUnselected
              }
            />
            <Text style={styles.newLessonModalDayText}>Sun</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class DescriptionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{}}>
        <TextInput
          style={[
            styles.descriptionInputStyle,
            this.props.direction === 'rtl'
              ? {textAlign: 'right'}
              : {textAlign: 'left'},
          ]}
          placeholder={'Enter description'}
          numberOfLines={10}
          multiline={true}
        />
      </View>
    );
  }
}

export class SynMinTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      type: 'week',
    };
  }

  componentDidMount() {
    this.setState({
      mon: this.props.mon,
      tue: this.props.tue,
      wed: this.props.wed,
      thu: this.props.thu,
      fri: this.props.fri,
      sat: this.props.sat,
      sun: this.props.sun,
      type: this.props.type,
    });
  }

  render() {
    const {mon, tue, wed, thu, fri, sat, sun, type} = this.state;
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Colors.lessonLightText,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>Shachrit</Text>
          <Chevron size={1} color="gray" style={{marginRight: 5}} />
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.lessonLightText,
            marginVertical: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>Select date/time</Text>
          <Image
            source={require('../../assets/icon_modal_timetable.png')}
            style={{width: 14, height: 14, resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.lessonLightText,
            marginVertical: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>Set Days</Text>
          <Text style={{fontSize: 12, color: Colors.lessonLightText}}>
            {type === 'week' ? 'Weekly recurrence' : 'Daily'}
          </Text>
        </View>
        {type === 'week' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.setState({mon: !mon});
              }}>
              <View
                style={
                  mon
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>Mon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.setState({tue: !tue});
              }}>
              <View
                style={
                  tue
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>Tue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.setState({wed: !wed});
              }}>
              <View
                style={
                  wed
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>Wed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.setState({thu: !thu});
              }}>
              <View
                style={
                  thu
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>Thu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.setState({fri: !fri});
              }}>
              <View
                style={
                  fri
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>Fri</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.setState({sat: !sat});
              }}>
              <View
                style={
                  sat
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>Sat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newLessonModalDayContainer}
              onPress={() => {
                this.setState({sun: !sun});
              }}>
              <View
                style={
                  sun
                    ? styles.newLessonModalDaySelected
                    : styles.newLessonModalDayUnselected
                }
              />
              <Text style={styles.newLessonModalDayText}>Sun</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export class NormalSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      switchValue: false,
    };
  }

  componentDidMount() {
    this.setState({
      type: this.props.type,
      switchValue: this.props.initialStatus,
    });
  }

  render() {
    const {switchValue, type} = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          marginTop: 15,
        }}>
        <Text>{type}</Text>
        <Switch
          value={switchValue}
          // tintColor={Colors.primary}
          // thumbColor={Colors.primary}
          trackColor={{true: Colors.primary, false: 'lightgray'}}
          onValueChange={() => {
            this.setState({switchValue: !switchValue});
          }}
        />
      </View>
    );
  }
}
