import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import DateProcessor from "src/utils/DateProcessor";

const id = "1";

export const setReminder = async (dateProcessor: DateProcessor) => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel",
  });

  if (dateProcessor?.date.valueOf() <= new Date().valueOf()) {
    dateProcessor.nextDay();
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: dateProcessor.date.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  await notifee.createTriggerNotification(
    {
      id,
      title: "What are you grateful for today?",
      body: "Take time to leave an entry",
      android: {
        channelId,
      },
    },
    trigger,
  );
};

export const removeReminder = () => {
  notifee.cancelTriggerNotification(id);
  notifee.cancelNotification(id);
};
