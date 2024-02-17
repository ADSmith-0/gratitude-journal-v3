import { MMKVLoader } from "react-native-mmkv-storage";

const MMKV = new MMKVLoader().withInstanceID("local-storage").initialize();

export default MMKV;
