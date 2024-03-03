import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext } from "react";

type IUserContext = FirebaseAuthTypes.User | null;

export const UserContext = createContext<IUserContext>(null);
