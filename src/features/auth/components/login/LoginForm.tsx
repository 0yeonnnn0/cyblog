"use client";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { InputField } from "@/components/InputField";
import { LoginHeader } from "./LoginHeader";
import type { LoginCredentials } from "@/types/auth";

export function LoginForm() {
  const { handleLogin, isLoading, errors } = useLogin();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(formData);
  };

  return (
    <div className="border-solid border border-gray-300 rounded-md">
      <LoginHeader />
      <div className="m-8">
        <form onSubmit={handleSubmit} className="mb-4">
          <InputField
            type="text"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            roundedClass="rounded-login-input-top"
          />

          <InputField
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            roundedClass="rounded-login-input-bottom"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-login-button h-login-button rounded-login-button bg-theme-color-blue text-white ${
                isLoading ? "bg-blue-300 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
