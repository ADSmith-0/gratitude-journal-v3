import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import DateProcessor from "src/utils/DateProcessor";

function notifications() {
  async function setup() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    const dateProcessor = new DateProcessor();
    dateProcessor.nextDay();
    dateProcessor.date.setHours(14);
    dateProcessor.date.setMinutes(50);

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
        id: "1",
        title: "What are you grateful for today?",
        body: "Take time to leave an entry",
        android: {
          channelId,
        },
      },
      trigger,
    );
  }

  return {
    setup,
  };
}

export default notifications;
