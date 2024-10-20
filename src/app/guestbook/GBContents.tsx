import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GuestbookEntry {
  _id: string;
  guestName: string;
  date: string;
  contents: string;
  isUser: boolean;
}

interface GBContentsProps {
  guestbook: GuestbookEntry[];
}

const GBContents: React.FC<GBContentsProps> = ({ guestbook }) => {
  return (
    <div className="border-t border-solid border-gray-300">
      {guestbook?.map((entry, index) => (
        <div className="guestbook-comments" key={index}>
          <div className="guestbook-header flex justify-between w-full pr-4">
            <div
              className={`guestbook-username font-bold font-mono ${
                entry.isUser ? "text-blue-500" : ""
              }`}
              onClick={() => console.log(entry)}
            >
              {entry.guestName}
            </div>
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="guestbook-delete-btn text-gray-500"
              onClick={() => console.log("이거 누르면 팝업 띄워줌")}
            />
          </div>

          <div className="pl-6 w-full font-mono">{entry.contents}</div>

          <div className="guestbook-footer pl-6 text-sm">
            <div className="guestbook-upload-date">
              {entry.date.slice(2, 10)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GBContents;
