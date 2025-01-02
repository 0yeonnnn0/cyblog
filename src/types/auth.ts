// 회원가입 데이터 타입
export interface AuthCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface JoinFormData {
  email: string;
  password: string;
  username: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  username?: string;
}

// 로그인 데이터 타입
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  email: string | null;
  username: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// InputField 컴포넌트 props 타입도 추가
export interface InputFieldProps {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roundedClass?: string;
}
