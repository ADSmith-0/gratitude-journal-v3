import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import auth from "@react-native-firebase/auth";

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(newUser => setUser(newUser));
    return subscriber;
  }, []);

  // NOTE: Maybe change back to {{ user }} for continuity?
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
