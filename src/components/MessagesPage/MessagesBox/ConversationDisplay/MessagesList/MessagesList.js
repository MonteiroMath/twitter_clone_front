import { useEffect } from "react";
import styles from "./MessagesList.module.css";
import { useSelector } from "react-redux";
import { selectJwtToken, selectUserData } from "../../../../../store/UserSlice";
import { client } from "../../../../../api/client";

function Message({ message }) {
  const userData = useSelector(selectUserData);
  const jwtToken = useSelector(selectJwtToken);

  useEffect(() => {
    const { userID, isRead } = message;

    if (userID !== userData.id && !isRead) {
      client.markRead(message.id, jwtToken);
    }
  });

  return (
    <div
      className={`${styles.message} ${
        message.userID !== userData.id && styles.contactMessage
      }`}
      key={message.id}
    >
      {message.message}
    </div>
  );
}

function MessagesList({ messages }) {
  return (
    <>
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </>
  );
}

export default MessagesList;
