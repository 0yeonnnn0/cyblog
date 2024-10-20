"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import JoinForm from "./JoinForm"; // 회원가입 폼

const JoinPage: React.FC = () => {
  return (
    <div className="border-solid border border-gray-300 rounded-md">
      <div className="bg-gray-300 h-14">
        <div className="flex items-center justify-center h-14 gap-3 text-lg">
          <FontAwesomeIcon icon={faUserPlus} />
          회원가입
        </div>
      </div>
      <JoinForm />
    </div>
  );
};

export default JoinPage;
