import Image from "next/image";
import profileImg from "@/public/profile_pic.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faEnvelope,
  faLaptopCode,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "@/app/globals.css";

const ProfilePage = () => {
  return (
    <div>
      <div className="grid gap-8 pr-3 grid-cols-[1fr_2fr]">
        <Image
          src={profileImg}
          alt="profile"
          className="h-[210px] rounded-[10px]"
          width={150}
          height={150}
          priority={true}
        />
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex flex-row gap-3">
            <div className="w-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>Dongyeon Kim</div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faCakeCandles} />
            </div>
            <div>2000. Feb. 20</div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faLaptopCode} />
            </div>
            <a
              href="https://github.com/0yeonnnn0/cyblog"
              target="_blank"
              rel="noopener noreferrer" // 보안 취약점 방지
              className="underline "
            >
              ON GITHUB
            </a>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <a href="mailto:angrybird2600@gmail.com" className="underline">
              angrybird2600 @ gmail.com
            </a>
          </div>
        </div>
        <div className="col-span-2">안녕하세요</div>
      </div>
    </div>
  );
};

export default ProfilePage;
