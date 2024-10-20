interface GBUserInputProps {
    user: string | null;
  }
  
  const GBUserInput: React.FC<GBUserInputProps> = ({ user }) => {
    return (
      <>
        {user ? (
          <div>
            <input className="hidden" type="checkbox" name="isUser" checked />
            <input
              type="text"
              className="guestbook-writer guestbook-logged-in"
              value={user}
              name="guestName"
              readOnly
            />
          </div>
        ) : (
          <div className="border-b-2 border-solid border-gray-200 border-collapse m-0">
            <input className="hidden" type="checkbox" name="isUser" />
            <input
              type="text"
              className="guestbook-user-info rounded-tl border-x-2 m-0"
              placeholder="이름"
              name="guestName"
            />
            <input
              type="password"
              className="guestbook-user-info border-r-2 rounded-tr m-0"
              placeholder="비밀번호"
              name="pw"
            />
          </div>
        )}
      </>
    );
  };
  
  export default GBUserInput;
  