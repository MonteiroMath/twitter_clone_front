import styles from "./MessagesList.module.css";

function MessagesList({ messages, userID }) {
  
  return (
    <>
      {messages.map((message) => (
        <div
          className={`${styles.message} ${
            message.userID !== userID && styles.contactMessage
          }`}
          key={message.id}
        >
          {message.message}
        </div>
      ))}
    </>
  );
}

export default MessagesList;
