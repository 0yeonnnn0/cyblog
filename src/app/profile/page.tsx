// Importing necessary assets and libraries
import Image from "next/image"; // Next.js의 최적화된 이미지 컴포넌트
import profileImg from "../../../public/profile_pic.jpeg"; // 절대 경로를 사용하는 것이 편리함

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles, faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faFileCode } from "@fortawesome/free-regular-svg-icons";
import "@/app/globals.css";

// ProfilePage 컴포넌트
const ProfilePage = () => {
  return (
    <div>
      <div className="grid gap-[23px] pr-[10px] grid-cols-[1fr_2fr]">
        <Image
          src={profileImg}
          alt="profile"
          className="h-[210px] rounded-[10px]"
          width={150}
          height={150} // 너비와 높이를 지정하여 레이아웃 시프트 방지
          priority={true} // 초기 로딩 시 우선순위 설정
        />
        <div>
          <FontAwesomeIcon icon={faLaptopCode} size="xs" />
          <div>by Dongyeon Kim</div>
          <FontAwesomeIcon icon={faCakeCandles} />
          <div>2000. Feb. 20</div>
          <FontAwesomeIcon icon={faFileCode} />
          <div>23.08.07 ~ 23.09.02(Ver.1)</div>
          <div>
            <a
              href="https://github.com/0yeonnnn0/cyblog2024_ft"
              target="_blank"
              rel="noopener noreferrer" // 보안 취약점 방지
            >
              ON GITHUB
            </a>
          </div>
          <FontAwesomeIcon icon={faEnvelope} />
          <div>angrybird2600 @ gmail.com</div>
        </div>
        <div className="col-span-2">안녕하세요</div>
      </div>
    </div>
  );
};

export default ProfilePage;
