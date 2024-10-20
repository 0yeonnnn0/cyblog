// Import necessary modules
import Image from "next/image";
import profileImg from "@/public/profile.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareGithub,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

// Define the HPLeftSide component
const HPLeftSide = () => {
  return (
    <div className="flex justify-between flex-col gap-3 h-full pb-3 items-center ">
      <div>
        {/* Use the Next.js Image component for optimized images */}
        <Image
          src={profileImg}
          alt="profile"
          className="w-40 h-40 rounded-xl bg-cover mb-5 select-none"
          width={160} // Tailwind CSS의 w-40과 일치하는 값
          height={160} // Tailwind CSS의 h-40과 일치하는 값
          priority // 페이지 로딩 시 이 이미지의 우선순위를 높임
        />

        <div className="w-40 h-32 text-pretty select-none">
          제 일기장에 오신 것을 환영합니다. 🌱
        </div>
      </div>
      <div className="flex gap-5 font-black select-none">
        <a
          href="https://www.instagram.com/___yeonnnn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faSquareInstagram} size="2x" />
        </a>
        <a
          href="https://github.com/0yeonnnn0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faSquareGithub} size="2x" />
        </a>
        <a
          href="https://lmsd1.tistory.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faSquarePen} size="2x" />
        </a>
      </div>
    </div>
  );
};

export default HPLeftSide;
