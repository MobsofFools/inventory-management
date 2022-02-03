import { signOut } from "firebase/auth";
import { auth } from "../db/firebase-config";

export const logout = async () => {
  await signOut(auth);
};
