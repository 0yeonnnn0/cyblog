import { auth } from "@/lib/firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getIdToken,
} from "firebase/auth";
import type { AuthCredentials } from "@/types/auth";

export async function registerUser({
  email,
  password,
  username,
}: AuthCredentials) {
  try {
    // Firebase 회원가입
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 사용자 프로필 업데이트
    if (username) {
      await updateProfile(user, { displayName: username });
    }

    // 토큰 발급
    const token = await getIdToken(user);
    return token;
  } catch (error) {
    console.error("Firebase Registration Failed:", error);
    throw error;
  }
}
