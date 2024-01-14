import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

const ContentWrapper = ({ style, children }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          marginTop: insets.top,
          marginLeft: insets.left,
          marginRight: insets.right,
          marginBottom: insets.bottom + bottomTabBarHeight,
          paddingBottom: insets.bottom,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default ContentWrapper;
