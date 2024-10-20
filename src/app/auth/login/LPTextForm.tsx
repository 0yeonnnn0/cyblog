import React from "react";

const LPTextForm: React.FC = () => {
  return (
    <form method="POST" action="/login" className="m-8">
      <div className="mb-4">
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          className="block h-12 w-full px-3 py-2 border border-gray-300 rounded-login-input-top focus:outline-1 focus:outline-theme-color-blue sm:text-sm"
        />

        <input
          type="password"
          id="password"
          name="pw"
          placeholder="Password"
          className="block h-12 w-full px-3 py-2 border border-t-0 border-gray-300 rounded-login-input-bottom focus:outline-1 focus:outline-theme-color-blue sm:text-sm"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-login-button h-login-button rounded-login-button bg-theme-color-blue text-white"
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default LPTextForm;
