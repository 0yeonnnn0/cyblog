import { registerUser } from "../api/joinApi";
import type { AuthCredentials } from "@/types/auth";

export class JoinService {
  static async join(credentials: AuthCredentials) {
    try {
      const token = await registerUser(credentials);

      // 토큰 저장 또는 다른 후처리 로직이 필요하다면 여기서 처리
      if (token) {
        // localStorage나 다른 상태 관리에 토큰 저장 가능
        return { success: true, token };
      }

      return { success: false, error: "Failed to get token" };
    } catch (error) {
      console.error("Join Service Error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  static validateCredentials(credentials: AuthCredentials) {
    const errors: Record<string, string> = {};

    if (!credentials.email) {
      errors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!credentials.username) {
      errors.username = "사용자 이름을 입력해주세요";
    } else if (credentials.username.length < 2) {
      errors.username = "사용자 이름은 2자 이상이어야 합니다";
    }

    if (!credentials.password) {
      errors.password = "비밀번호를 입력해주세요";
    } else if (credentials.password.length < 6) {
      errors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
