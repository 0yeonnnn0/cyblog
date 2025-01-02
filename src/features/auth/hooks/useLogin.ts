import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { LoginService } from "../services/loginService";
import type { LoginCredentials, ValidationErrors } from "@/types/auth";

export function useLogin() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setErrors({});

    try {
      // 유효성 검사
      const validation = LoginService.validateCredentials(credentials);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return false;
      }

      // 로그인 시도
      const result = await LoginService.login(credentials);

      if (result.success && result.user) {
        setUser(result.user); // Zustand store에 사용자 정보 저장
        router.push("/"); // 홈페이지로 이동
        return true;
      } else {
        setErrors({
          email: result.error || "로그인에 실패했습니다.",
        });
        return false;
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({
        email: "로그인 중 오류가 발생했습니다.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    errors,
  };
}
