"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import LPTextForm from "./LPTextForm";

export default function LoginPage() {
  return (
    <div className="border-solid border border-gray-300 rounded-md">
      <div className="bg-gray-300 h-14">
        <div className="flex items-center justify-center h-14 gap-3 text-lg">
          <FontAwesomeIcon icon={faRightToBracket} />
          ID/PW
        </div>
      </div>
      <LPTextForm />
    </div>
  );
}
