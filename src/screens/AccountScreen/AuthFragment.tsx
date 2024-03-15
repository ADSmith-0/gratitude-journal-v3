import { View } from "react-native";
import Input from "src/components/UI/Input";
import Button from "src/components/UI/Button";
import { styles } from "src/styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import Banner from "src/components/UI/Banner";

type Props = {
  type: "Sign up" | "Login";
};

const { flex_column_center, border_grey_700, btw_1, mh_10, mt_10, pt_8 } =
  styles;

const AuthFragment = ({ type }: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<{ "Sign up": undefined }, "Sign up">>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // TODO: Implement error handling for login
  // TODO: Implement error handling for sign up

  const [error, setError] = useState<string | undefined>();

  const getErrorMessageFromCode = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-credential": {
        return "Could not log in. Please check your email and password and try again";
      }
      default: {
        return "";
      }
    }
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }

    switch (type) {
      case "Login": {
        await auth()
          .signInWithEmailAndPassword(email, password)
          .catch(err => {
            setError(getErrorMessageFromCode(err.code));
          });
        break;
      }
      case "Sign up": {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(err => {
            setError(getErrorMessageFromCode(err.code));
          });
        break;
      }
    }
  };

  // FIX: Remove the styles. from here
  return (
    <View style={[flex_column_center, mh_10, styles.gap_7, mt_10]}>
      <Input
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        label="Password"
        secureTextEntry
        style={styles.mb_5}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {error && <Banner message={error} />}
      <Button
        title={type}
        onPress={handleSubmit}
        buttonStyle={[styles.mt_10, styles.mb_4]}
      />
      {type === "Login" && (
        <View style={[border_grey_700, pt_8, btw_1]}>
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
