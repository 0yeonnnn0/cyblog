import NavigationLink from "@/components/NavigationLink";

interface AuthBottomNavProps {
  isLoginPage: boolean;
}

export function AuthBottomNav({ isLoginPage }: AuthBottomNavProps) {
  return (
    <div className="flex text-sm justify-center my-2 text-gray-500 gap-3">
      <NavigationLink path="/auth/find/id" label="아이디 찾기" />
      <p>|</p>
      <NavigationLink path="/auth/find/pw" label="비밀번호 찾기" />
      <p>|</p>
      {isLoginPage ? (
        <NavigationLink path="/auth/join" label="회원가입" />
      ) : (
        <NavigationLink path="/auth/login" label="로그인" />
      )}
    </div>
  );
}
