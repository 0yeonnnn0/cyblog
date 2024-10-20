"use client"; // Next.js 클라이언트 컴포넌트로 지정

import { useState } from "react";
import "@/app/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelectDate } from "@/context/SelectDateContext";

interface BlogPageProps {
  selectDate: Date;
}

const BlogPage: React.FC<BlogPageProps> = () => {
  const [likes, setLikes] = useState<number>(0);
  const selectDate = useSelectDate();

  return (
    <div className="flex flex-col content-between min-h-full">
      <h1 className="mb-3">
        {selectDate?.getFullYear()}년 {selectDate?.getMonth() + 1}월 {selectDate?.getDate()}일
      </h1>

      <div className="blog-content p-2 flex-1 h-full font-mono">
        <p>일기 내용이 들어갈 자리입니다.</p>
      </div>
      <div className="border-t-2 border-gray-300 border-dashed px-3 pt-2">
        <button className="border border-gray-400 px-4 py-1 float-right">
          삭제
        </button>
        <button className="border border-gray-400 px-4 py-1 mr-4 float-right">
          수정
        </button>
        <div className="flex gap-2 pt-1">
          <button
            className="float-right ml-1 text-xl pt-0.5"
            onClick={() => setLikes(likes + 1)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <p className="float-right inline pt-1">{likes}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
