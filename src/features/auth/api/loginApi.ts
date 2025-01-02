import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { LoginCredentials, User } from "@/types/auth";

export async function loginWithFirebase({
  email,
  password,
}: LoginCredentials): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const { uid, email: userEmail, displayName } = user;

    // User 타입에 맞게 데이터 변환
    return {
      uid,
      email: userEmail,
      username: displayName || "Anonymous",
      isAdmin: true, // TODO: 실제 관리자 권한 체크 로직 필요
    };
  } catch (error) {
    console.error("Firebase Login Failed:", error);
    throw error;
  }
}
