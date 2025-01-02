import { useState } from "react";
import { useRouter } from "next/navigation";
import { JoinService } from "../services/joinService";
import type { AuthCredentials, ValidationErrors } from "@/types/auth";

export function useJoin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleJoin = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    setErrors({});

    try {
      // 유효성 검사
      const validation = JoinService.validateCredentials(credentials);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return false;
      }

      // 회원가입 시도
      const result = await JoinService.join(credentials);

      if (result.success) {
        router.push("/auth/login"); // 성공시 로그인 페이지로 이동
        return true;
      } else {
        setErrors({ email: result.error }); // 서비스 에러를 이메일 에러로 표시
        return false;
      }
    } catch (error) {
      console.error("Join Error:", error);
      setErrors({
        email: "회원가입 중 오류가 발생했습니다.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleJoin,
    isLoading,
    errors,
  };
}
