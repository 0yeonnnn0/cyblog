// "use client";
// import { useEffect, useRef, useState } from "react";
// import { GBContents, GBForm, GuestbookEntry } from "./guestbookView";
// import { guestbookModel } from "./guestbookModel";

// interface GuestbookControllerProps {
//   user: string;
// }

// export function GuestbookController({ user }: GuestbookControllerProps) {
//   const [entries, setEntries] = useState<GuestbookEntry[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const textRef = useRef<HTMLTextAreaElement | null>(null);

//   useEffect(() => {
//     fetchGuestbookEntries();
//   }, []);

//   const fetchGuestbookEntries = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await guestbookModel.getAllEntries();
//       setEntries(data);
//     } catch (error) {
//       setError(
//         error instanceof Error ? error.message : "서버 오류가 발생했습니다."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (content: string) => {
//     if (!content.trim()) {
//       alert("내용을 입력해주세요.");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const newEntry = await guestbookModel.createEntry({
//         guestName: user,
//         contents: content.trim(),
//         date: new Date().toISOString(),
//         isUser: true,
//       });

//       setEntries((prev) => [newEntry, ...prev]);
//       setError(null);

//       if (textRef.current) {
//         textRef.current.value = "";
//         textRef.current.style.height = "auto";
//       }
//     } catch (error) {
//       alert(
//         error instanceof Error
//           ? error.message
//           : "방명록 작성 중 오류가 발생했습니다."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("정말로 삭제하시겠습니까?")) {
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await guestbookModel.deleteEntry(id);
//       setEntries((prev) => prev.filter((entry) => entry._id !== id));
//       setError(null);
//     } catch (error) {
//       alert(
//         error instanceof Error
//           ? error.message
//           : "방명록 삭제 중 오류가 발생했습니다."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="guestbook-container">
//       <GBForm user={user} textRef={textRef} onSubmit={handleSubmit} />

//       {isLoading ? (
//         <div className="border-t border-solid border-gray-300 flex items-center justify-center min-h-[200px]">
//           <p>로딩 중...</p>
//         </div>
//       ) : error ? (
//         <div className="border-t border-solid border-gray-300 flex items-center justify-center min-h-[200px]">
//           <div className="text-center">
//             <p>{error}</p>
//             <button
//               onClick={fetchGuestbookEntries}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               다시 시도
//             </button>
//           </div>
//         </div>
//       ) : entries.length === 0 ? (
//         <div className="border-t border-solid border-gray-300 flex items-center justify-center min-h-[200px] text-gray-500">
//           작성된 방명록이 없습니다.
//         </div>
//       ) : (
//         <GBContents guestbook={entries} onDelete={handleDelete} />
//       )}
//     </div>
//   );
// }
