import { useEffect } from "react";

import { io } from "socket.io-client";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import ConversationDisplay from "./ConversationDisplay/ConversationDisplay";
import StartConversation from "./StartConversation/StartConversation";

function MessagesBox() {
  const { recipientID } = useParams;

  useEffect(() => {
    const socket = io("http://localhost:6868");
  }, []);

  return recipientID ? <ConversationDisplay /> : <StartConversation />;
}

export default MessagesBox;
