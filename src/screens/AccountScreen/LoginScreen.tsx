import { styles } from "src/styles";
import ContentWrapper from "src/components/Screen/ContentWrapper";
import Box from "src/components/UI/Box";
import Button from "src/components/UI/Button";
import Text from "src/components/UI/Text";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import EntriesStorage from "src/utils/EntriesStorage";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  user: FirebaseAuthTypes.User;
};

const LoginScreen = ({ user }: Props) => {
  const [entriesCount, setEntriesCount] = useState<number>(0);

  useFocusEffect(() => {
    setEntriesCount(
      Object.values(EntriesStorage.getAll()).reduce(
        (acc, monthEntries) => acc + Object.keys(monthEntries).length,
        0,
      ),
    );
  });

  return (
    <ContentWrapper
      style={[
        styles.flex_column_center,
        styles.mt_8,
        styles.mh_10,
        styles.gap_4,
      ]}>
      <Text size="l">{user.email}</Text>
      <Box style={[styles.bg_white, styles.gap_4]}>
        <Text>
          {entriesCount} {entriesCount > 1 ? "Entries" : "Entry"}
        </Text>
        <Text>23 Entries</Text>
      </Box>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </ContentWrapper>
  );
};

export default LoginScreen;
