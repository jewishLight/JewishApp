import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, TextInput } from "react-native";
import { styles } from "./styles";
import Modal from "react-native-modal";
import { Colors, Metric, Strings } from "../../themes";
import { AddModalCloseButton } from "../../components";

export class NormalInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={{
            height: 60,
            borderColor: Colors.lessonLightText,
            borderWidth: 1,
            color: Colors.lessonLightText,
            fontSize: 14,
            paddingHorizontal: 10,
            marginTop: 10,
            borderRadius: 5
          }}
          placeholder={"Enter subject here..."}
        />
      </View>
    );
  }
}
