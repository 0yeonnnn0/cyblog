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
        <div className="col-span-2 font-mono leading-relaxed">
          Next.js, Typescript, TailwindCSS, zustand, mongoDB, Vercel
          <br />
          저는 티스토리 블로그를 3년째 운영해오고 있는데요,
          <br />
          제가 느낀 점들에 대해 가감없이 그대로 표현해낼 수 있다는 점이
          매력적으로 다가왔습니다.
          <br />
          다만 개발 내용 위주의 티스토리 블로그에서 개인적인 이야기까지 적기엔
          다소 무리가 있어 개인적인 이야기를 담을 수 있는 블로그를
          제작하였습니다.
          <br />
          테마는 &quot;싸이월드&quot;에서 따왔습니다. 좌측 달력의 날짜를 클릭해
          다른 글을 볼 수 있습니다. 이후에도 채팅 등의 기능을 꾸준히 업데이트할
          예정입니다.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
