import { Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

export const wp = (percentage) => width * (percentage / 100);
export const hp = (percentage) => height * (percentage / 100);

export const rs = scale;         // responsive horizontal scale
export const vrs = verticalScale; // vertical scale
export const ms = moderateScale;  // moderate scaling based on device size

