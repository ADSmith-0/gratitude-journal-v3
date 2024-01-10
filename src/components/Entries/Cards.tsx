import { useState } from "react";
import { VirtualizedList } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "src/components/Entries/Card";
import { styles } from "src/styles";
import { DateString, Entries } from "src/types";
import DateProcessor from "src/utils/DateProcessor";
import EntriesStorage from "src/utils/EntriesStorage";

const Cards = () => {
  const [entries] = useState<Entries>(EntriesStorage.getAll());
  const entriesList: { date: DateString; entryText: string }[] = [];

  for (const monthEntry of Object.entries(entries)) {
    const [monthYear, dates] = monthEntry;

    if (!dates.size) {
      const [month, year] = monthYear.split("/");

      for (const entry of Object.entries(dates)) {
        const [date, entryText] = entry;
        const readableDate: DateString = new DateProcessor(
          new Date(+year, +month - 1, +date).valueOf(),
        ).toReadableDate();

        if (entryText) {
          entriesList.push({ date: readableDate, entryText });
        }
      }
    }
  }

  return (
    <VirtualizedList
      initialNumToRender={4}
      data={entriesList}
      getItemCount={data => data.length}
      getItem={(data, index) => data[index]}
      keyExtractor={data => data.date}
      renderItem={({
        item,
      }: {
        item: { date: DateString; entryText: string };
      }) => <Card key={item.date} date={item.date} entry={item.entryText} />}
      style={[styles.gap_5, styles.ph_7, styles.bg_offWhite]}
    />
  );
};

export default Cards;
