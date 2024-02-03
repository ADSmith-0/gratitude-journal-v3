import { Search } from "lucide-react-native";
import { ReactElement } from "react";
import { View } from "react-native";
import Cards from "src/components/Entries/Cards";
import ContentWrapper from "src/components/Screen/ContentWrapper";
import Button from "src/components/UI/Button";
import Input from "src/components/UI/Input";
import { colours, fontSize, styles } from "src/styles";
const {
  absolute,
  align_items_stretch,
  flex_1,
  flex_column_center,
  gap_5,
  pl_5,
  mb_4,
  mh_5,
  mt_8,
} = styles;

const EntriesScreen = () => {
  const searchIcon = (pressed: boolean): ReactElement => (
    <Search
      color={pressed ? colours.grey[300] : colours.grey[100]}
      size={fontSize.l}
    />
  );

  // TODO: Get search bar working
  // NOTE: Add filters/sorting?
  // NOTE: Change to Insights panel? analytics, commonly used words/terms etc.

  return (
    <ContentWrapper
      style={[flex_column_center, align_items_stretch, gap_5, flex_1]}>
      <View style={[mt_8, mb_4]}>
        <Input placeholder="Search" style={[mh_5, pl_5]} />
        <Button buttonStyle={absolute} variant="tertiary" icon={searchIcon} />
      </View>
      <Cards />
    </ContentWrapper>
  );
};

export default EntriesScreen;
