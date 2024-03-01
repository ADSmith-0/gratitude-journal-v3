import { View } from "react-native";
import Input from "src/components/UI/Input";
import Button from "src/components/UI/Button";
import { styles } from "src/styles";
import { useNavigation } from "@react-navigation/native";

type Props = {
  type: "Sign up" | "Login";
};

const { flex_column_center, border_grey_700, btw_1, mh_10, mt_10, pt_8 } =
  styles;

const AuthFragment = ({ type }: Props) => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    switch (type) {
      case "Login": {
        console.log("Login");
        break;
      }
      case "Sign up": {
        console.log("Sign up");
        break;
      }
    }
  };

  // FIX: Remove the styles. from here
  return (
    <View style={[flex_column_center, mh_10, styles.gap_7, mt_10]}>
      <Input label="Email" keyboardType="email-address" />
      <Input label="Password" secureTextEntry style={styles.mb_5} />
      <Button
        title={type}
        onPress={handleSubmit}
        buttonStyle={[styles.mt_10, styles.mb_4]}
      />
      {type === "Login" && (
        <View style={[styles.border_grey_700, styles.pt_8, styles.btw_1]}>
          <Button
            title="Register"
            variant="secondary"
            onPress={() => navigation.navigate("Sign up")}
          />
        </View>
      )}
    </View>
  );
};

export default AuthFragment;
