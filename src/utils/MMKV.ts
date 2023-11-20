import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().withEncryption().initialize();

export default MMKV;
