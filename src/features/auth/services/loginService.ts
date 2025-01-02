import { loginWithFirebase } from "../api/loginApi";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export class LoginService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const user = await loginWithFirebase(credentials);
      
      if (user) {
        return {
          success: true,
          user
        };
      }
      
      return {
        success: false,
        error: "로그인에 실패했습니다."
      };
    } catch (error) {
      console.error("Login Service Error:", error);
      return {
        success: false,
        error: error instanceof Error 
          ? error.message 
          : "알 수 없는 오류가 발생했습니다."
      };
    }
  }

  static validateCredentials(credentials: LoginCredentials) {
    const errors: Record<string, string> = {};

    if (!credentials.email) {
      errors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!credentials.password) {
      errors.password = "비밀번호를 입력해주세요";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}