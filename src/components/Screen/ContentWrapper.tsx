import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { bottomTabBarHeight } from "src/utils/globals";

type Props = {
  children: ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
        marginLeft: insets.left,
        marginRight: insets.right,
        marginBottom: insets.bottom + bottomTabBarHeight,
      }}>
      {children}
    </View>
  );
};

export default ContentWrapper;
