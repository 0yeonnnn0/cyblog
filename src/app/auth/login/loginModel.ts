import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginModelProps {
  email: string;
  password: string;
}

// 반환 타입을 User 정보와 displayName(username)으로 설정
export const loginByFirebase = async ({ email, password }: LoginModelProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const { uid, email: userEmail, displayName } = user;

    console.log("Login Success At loginByFirebase");

    return {
      uid,
      email: userEmail,
      username: displayName || "Anonymous", // displayName이 없을 경우 기본값 설정
      isAdmin: true,
    };
  } catch (error) {
    console.error("Login Failed", error);
    throw error;
  }
};
