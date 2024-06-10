import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import ConversationDisplay from "./ConversationDisplay/ConversationDisplay";
import StartConversation from "./StartConversation/StartConversation";

function MessagesBox() {
  const { recipientName } = useParams();

  return recipientName ? <ConversationDisplay /> : <StartConversation />;
}

export default MessagesBox;
