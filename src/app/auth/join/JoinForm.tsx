"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    // 사용자 이름 검증
    if (!formData.username) {
      newErrors.username = "사용자 이름을 입력해주세요";
    } else if (formData.username.length < 2) {
      newErrors.username = "사용자 이름은 2자 이상이어야 합니다";
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 해당 필드의 에러 메시지 삭제
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await axios.post("/api/auth/join", {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        });

        if (response.status === 201) {
          console.log("회원가입 성공:", response.data);
          alert("회원가입이 성공적으로 완료되었습니다.");
        }
      } catch (error: any) {
        if (error.response) {
          console.error("회원가입 실패:", error.response.data);
          setErrors((prev) => ({
            ...prev,
            submit: error.response.data.message || "회원가입 실패",
          }));
        } else {
          console.error("회원가입 에러:", error.message);
          setErrors((prev) => ({
            ...prev,
            submit: "회원가입 중 오류가 발생했습니다.",
          }));
        }
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              사용자 이름
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="사용자 이름을 입력하세요"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="이메일을 입력하세요"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="비밀번호를 입력하세요"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-login-button rounded-login-button bg-theme-color-blue text-white ${
              isSubmitting ? "bg-blue-300 cursor-not-allowed" : "null"
            }`}
          >
            {isSubmitting ? "처리중..." : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
}
