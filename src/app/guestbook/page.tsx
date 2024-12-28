"use client";
import { GuestbookController } from "./guestbookController";

interface GuestbookPageProps {
  user: string;
}

export default function GuestbookPage({ user }: GuestbookPageProps) {
  return (
    <div className="max-w-4xl mx-auto h-full guestbook-form">
      <GuestbookController user={user} />
    </div>
  );
}
