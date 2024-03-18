import { styles } from "src/styles";
import ContentWrapper from "src/components/Screen/ContentWrapper";
import Box from "src/components/UI/Box";
import Button from "src/components/UI/Button";
import Text from "src/components/UI/Text";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import EntriesStorage from "src/utils/EntriesStorage";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Banner from "src/components/UI/Banner";

const { bg_white, flex_column_center, gap_4, mh_10, mt_8 } = styles;

type Props = {
  user: FirebaseAuthTypes.User;
};

const LoginScreen = ({ user }: Props) => {
  const [entriesCount, setEntriesCount] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();

  useFocusEffect(() => {
    setEntriesCount(
      Object.values(EntriesStorage.getAll()).reduce(
        (acc, monthEntries) => acc + Object.keys(monthEntries).length,
        0,
      ),
    );
  });

  return (
    <ContentWrapper style={[flex_column_center, mt_8, mh_10, gap_4]}>
      <Text variant="secondary" size="s">
        Logged in as
      </Text>
      <Text size="l">{user.email}</Text>
      <Box style={[bg_white, gap_4]}>
        <Text>
          {entriesCount} {entriesCount > 1 ? "Entries" : "Entry"}
        </Text>
        {user.metadata.creationTime && (
          <Text>
            Created on{" "}
            {
              new Date(user.metadata.creationTime)
                .toLocaleDateString("en-GB")
                .split("T")[0]
            }
          </Text>
        )}
      </Box>
      <Button title="Sign out" onPress={() => auth().signOut()} />
      <Button
        title="Delete account"
        variant="secondary"
        flavour="destructive"
        onPress={() =>
          user
            .delete()
            .catch(err => setError(err.message.replace(/\[.*\] /, "")))
        }
      />
      {error && <Banner message={error} />}
    </ContentWrapper>
  );
};

export default LoginScreen;
