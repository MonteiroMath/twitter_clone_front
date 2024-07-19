import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import ConversationDisplay from "./ConversationDisplay/ConversationDisplay";
import StartConversation from "./StartConversation/StartConversation";

function MessagesBox() {
  const { conversationID } = useParams();

  return conversationID ? <ConversationDisplay /> : <StartConversation />;
}

export default MessagesBox;
