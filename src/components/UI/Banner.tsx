import { ViewProps } from "react-native/types";
import { Animated } from "react-native";
import Text from "./Text";
import { colours, fontSize, styles } from "src/styles";
import { useEffect, useRef } from "react";
import { XCircle } from "lucide-react-native";

const {
  bg_red_900,
  border_red_100,
  br_1,
  bw_1,
  flex_row_center,
  gap_2,
  p_4,
  ph_4,
} = styles;

type Props = ViewProps & {
  variant?: "error";
  message: string;
};

const Banner = ({ message, variant = "error" }: Props) => {
  const leftAnimation = useRef(new Animated.Value(-50)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(leftAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        flex_row_center,
        gap_2,
        br_1,
        border_red_100,
        bg_red_900,
        bw_1,
        p_4,
        {
          left: leftAnimation,
          opacity: fadeAnimation,
        },
      ]}>
      {variant === "error" && (
        <>
          <XCircle color={colours.red[100]} size={fontSize.l} />
          <Text style={ph_4}>{message}</Text>
        </>
      )}
    </Animated.View>
  );
};

export default Banner;
