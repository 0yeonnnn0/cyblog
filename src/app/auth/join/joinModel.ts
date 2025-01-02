import { auth } from "@/lib/firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getIdToken,
} from "firebase/auth";

export interface AuthCredentials {
  email: string;
  password: string;
  username?: string;
}

export async function registerByFirebase({
  email,
  password,
  username,
}: AuthCredentials) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    const token = await getIdToken(user);
    console.log("Registration Success At registerByFirebase");
    return token;
  } catch (error) {
    console.error("Registration Failed At registerByFirebase");
    throw error;
  }
}
