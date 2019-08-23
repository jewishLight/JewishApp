import { Dimensions, Platform } from "react-native";
import Colors from "./colors";

const { width, height } = Dimensions.get("window");
const headerHeight = Platform.OS === "ios" ? 70 : 100;

export default {
  width,
  height,
  topNavBarHeight: 50,
  buttonHeight: 60,
  smallButtonHeight: 50,
  marginHorizontal: 10,
  separatorHeight: 1,
  tabBar: {
    height: 65
  },
  font: {
    title: {
      fontSize: 14
    },
    subTitle: {
      fontSize: 22,
      fontWeight: "500",
      color: Colors.primary
    },
    button: {
      fontSize: 13
    },
    h1: {
      fontSize: 22
    },
    h2: {
      fontSize: 18
    },
    h3: {
      fontSize: 15
    },
    h4: {
      fontSize: 13
    },
    h5: {
      fontSize: 12
    }
  },
  headerHeight
};
