"use client";

import React, { useState } from "react";
import { logInController } from "./loginController";
import { useRouter } from "next/navigation";

function LPTextForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogIn = () => {
    logInController.logIn({ email, password });
    router.push("/");
  };

  return (
    <div className="m-8">
      <div className="mb-4">
        <InputField
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          roundedClass="rounded-login-input-top"
        />

        <InputField
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          roundedClass="rounded-login-input-bottom"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleLogIn}
          className="w-login-button h-login-button rounded-login-button bg-theme-color-blue text-white"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

interface InputFieldProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roundedClass?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  roundedClass,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`block h-12 w-full px-3 py-2 border border-gray-300 focus:outline-1 focus:outline-theme-color-blue sm:text-sm ${roundedClass}`}
    />
  );
};

export default LPTextForm;
