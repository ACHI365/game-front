import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/JoinSession.css";
import { Session, useMainContext } from "../../context/MainContext";
import { fetchGameSessions } from "../../services/api";
import generateUniqueId from "../../services/generateUniqueId";

interface JoinSessionPopupProps {
  sessions: Session[];
  onClose: () => void;
  gameId: number;
}

const JoinSessionPopup: React.FC<JoinSessionPopupProps> = ({
  sessions,
  onClose,
  gameId,
}) => {
  const [data, setData] = useState<Session[]>();
  const {
    currSession,
    setSessions,
    joinRoom,
    nickname,
    setSessionName,
    errorMessage,
  } = useMainContext();

  useEffect(() => {
    updateSession();
  }, []);

  const updateSession = async () => {
    const fetchedSessions = await fetchGameSessions();
    setSessions(fetchedSessions);
  };

  useEffect(() => {
    const tmp = sessions
      .map((session) => ({ ...session }))
      .filter((session) => session.gameId === gameId);

    setData(tmp);
  }, [sessions, currSession]);

  const popupRef = useRef<HTMLDivElement>(null);

  const joinSession = (session: Session) => {
    setSessionName(session.name ?? "");
    joinRoom(nickname, session.name ?? "");
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (!popupRef.current?.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition duration-300"
      style={{ margin: 0 }}
    >
      <div
        className="p-2 rounded-lg w-5/12"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          minWidth: "350px",
        }}
        ref={popupRef}
      >
        <div className="session-list overflow-hidden overflow-y-auto ">
          <table className="min-w-full bg-gray-900 text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Session</th>
                <th className="px-1 py-2 text-right">Users</th>
                <th className="px-1 py-2 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((session, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } transition-colors duration-200`}
                >
                  <td className="px-4 py-2 break-words max-w-xs">
                    {session.name}
                  </td>
                  <td className="px-1 py-2 text-right break-words max-w-xs">
                    {session.name ? (
                      <div>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        {session.occupancy}/2
                      </div>
                    ) : (
                      <>&nbsp;</>
                    )}
                  </td>
                  <td className="text-center">
                    {session.name ? (
                      <button
                        className="text-green-500"
                        onClick={() => joinSession(session)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
            {errorMessage && (
              <p className="error-message text-red-600">{errorMessage}</p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default JoinSessionPopup;
