"use client";
import { useEffect, useRef, useState } from "react";

import "@/app/globals.css";
// import GBTextArea from "./GBTextArea";
import GBForm from "./GBForm";
import GBContents from "./GBContents";
import { getGuestbookAPI } from "../api/apiAuth";

interface GuestbookEntry {
  _id: string;
  guestName: string;
  date: string;
  contents: string;
  isUser: boolean;
}

interface GuestbookPageProps {
  user: string;
}

function GuestbookPage({ user }: GuestbookPageProps) {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);

  useEffect(() => {
    try {
      let result = getGuestbookAPI();
      setGuestbook(result);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="guestbook-form p-2">
      <GBForm
        user={user}
        textRef={textRef}
        guestbook={guestbook}
        setGuestbook={setGuestbook}
      />

      <GBContents guestbook={guestbook} />
    </div>
  );
}

export default GuestbookPage;
