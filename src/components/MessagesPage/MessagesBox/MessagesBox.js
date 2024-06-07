import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { io } from "socket.io-client";

import ConversationDisplay from "./ConversationDisplay/ConversationDisplay";
import StartConversation from "./StartConversation/StartConversation";

function MessagesBox() {
  const { recipientName } = useParams();

  useEffect(() => {
    const socket = io("http://localhost:6868");
  }, []);

  return recipientName ? <ConversationDisplay /> : <StartConversation />;
}

export default MessagesBox;
