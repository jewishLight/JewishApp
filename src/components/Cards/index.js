import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { styles } from "./styles";
import { Metric } from "../../themes";

export const EventCard = ({ onPress }) => (
  <TouchableOpacity style={styles.eventCardContainer} onPress={onPress}>
    <View style={styles.eventUserLine}>
      <View style={styles.torahImageContainer}>
        <Image
          source={require("../../assets/icon_torah.png")}
          style={styles.torahImage}
        />
      </View>
      <View style={styles.eventUserContainer}>
        <Image
          source={require("../../assets/icon_avatar.png")}
          style={styles.eventUserAvatar}
        />
        <View style={styles.eventUserDetail}>
          <Text style={styles.eventUserRole}>Speaker</Text>
          <Text style={styles.eventUserName}>Silvan Radeh Meiv</Text>
        </View>
      </View>
    </View>
    <View>
      <Text style={styles.eventTitle}>The Weekly Shiur - On the parasha</Text>
      <View style={styles.eventTimeView}>
        <Image
          source={require("../../assets/icon_event_time.png")}
          style={{ width: 16, height: 16, resizeMode: "contain" }}
        />
        <Text style={styles.eventTimeText}>Today, 22:00</Text>
        <Image
          source={require("../../assets/icon_event_location.png")}
          style={{
            width: 12,
            height: 16,
            resizeMode: "contain",
            marginLeft: 10
          }}
        />
        <Text style={styles.eventTimeText}>King George 58, Jerusalem</Text>
      </View>
    </View>
  </TouchableOpacity>
);
