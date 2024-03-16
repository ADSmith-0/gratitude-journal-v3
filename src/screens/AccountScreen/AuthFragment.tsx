import { View } from "react-native";
import Input from "src/components/UI/Input";
import Button from "src/components/UI/Button";
import { styles } from "src/styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import Banner from "src/components/UI/Banner";

type Props = {
  type: "Sign up" | "Login";
};

const {
  border_grey_700,
  btw_1,
  flex_column_center,
  gap_7,
  mb_4,
  mb_5,
  mh_10,
  mt_10,
  pt_8,
} = styles;

const AuthFragment = ({ type }: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<{ "Sign up": undefined }, "Sign up">>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // TODO: Implement error handling for login
  // TODO: Implement error handling for sign up

  const [error, setError] = useState<string | undefined>();

  const getErrorMessageFromCode = (firebaseError: {
    code: string;
    message: string;
  }): string => {
    switch (firebaseError.code) {
      case "auth/invalid-credential": {
        return "Could not log in. Please check your email and password and try again";
      }
      default: {
        return firebaseError.message.replace(/\[.*\] /, "");
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
            setError(getErrorMessageFromCode(err));
          });
        break;
      }
      case "Sign up": {
        await auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(err => {
            setError(getErrorMessageFromCode(err));
          });
        break;
      }
    }
  };

  return (
    <View style={[flex_column_center, mh_10, gap_7, mt_10]}>
      <Input
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        label="Password"
        secureTextEntry
        style={mb_5}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {error && <Banner message={error} />}
      <Button title={type} onPress={handleSubmit} buttonStyle={[mt_10, mb_4]} />
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
