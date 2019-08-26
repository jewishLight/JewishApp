import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet
} from "react-native";
import { styles } from "./styles";
import Modal from "react-native-modal";
import { Colors, Metric, Strings } from "../../themes";
import { AddModalCloseButton } from "../../components";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";

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
          style={styles.newLessonSubjectTextInput}
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
      <View style={{ marginTop: 10 }}>
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              right: 10
            }
          }}
          onValueChange={value => console.log(value)}
          items={[
            { label: "Football", value: "football" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" }
          ]}
          Icon={() => {
            return (
              <View
                style={{
                  width: 30,
                  height: 45,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 3
                }}
              >
                <Chevron size={2} color="black" />
              </View>
            );
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 40 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 40 // to ensure the text is never behind the icon
  }
});

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
          style={styles.newLessonSubjectTextInput}
          placeholder={"Enter location..."}
        />
        <Image
          source={require("../../assets/icon_modal_location_input.png")}
          style={{
            width: 21,
            height: 27,
            resizeMode: "contain",
            position: "absolute",
            right: 10,
            top: 20
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
      sun: false
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
      sun: this.props.sun
    });
  }

  render() {
    const { mon, tue, wed, thu, fri, sat, sun } = this.state;
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: Colors.lessonLightText,
          marginTop: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 15, color: "black" }}>Set Days</Text>
          <Text style={{ fontSize: 12, color: Colors.lessonLightText }}>
            Weekly recurrence
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10
          }}
        >
          <TouchableOpacity
            style={styles.newLessonModalDayContainer}
            onPress={() => {
              this.setState({ mon: !mon });
            }}
          >
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
              this.setState({ tue: !tue });
            }}
          >
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
              this.setState({ wed: !wed });
            }}
          >
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
              this.setState({ thu: !thu });
            }}
          >
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
              this.setState({ fri: !fri });
            }}
          >
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
              this.setState({ sat: !sat });
            }}
          >
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
              this.setState({ sun: !sun });
            }}
          >
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
          style={{
            borderRadius: 10,
            height: 60,
            borderWidth: 1,
            borderColor: Colors.lessonLightText,
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginTop: 10
          }}
          placeholder={"Enter description"}
          numberOfLines={10}
          multiline={true}
        />
      </View>
    );
  }
}
