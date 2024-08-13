import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserData } from "../../../../store/UserSlice";
import { Row, Col } from "reactstrap";
import Avatar from "../../../Shared/Avatar/Avatar";

import { client } from "../../../../api/client";

function ContactCard({ conversationID }) {
  const userData = useSelector(selectUserData);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    client.getSummary(conversationID).then((result) => {
      
      if (result.success) {
        setConversation(result.conversation);
      }
    });
  }, [conversationID]);

  let toUser, message, formattedDate;

  if (conversation) {
    toUser = conversation.participants.find(
      (participant) => participant.id !== userData.id
    );

    message = conversation.messages[0];

    formattedDate = new Date(message.createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  return conversation ? (
    <Link to={`/messages/${conversationID}`}>
      <Row className="mt-4">
        <Col lg="1" xl="1">
          <Avatar avatar={toUser.avatar} />
        </Col>
        <Col></Col>
        <Col lg="9" xl="9">
          <div>
            <span className="cfw-bolder">{toUser.username} </span> -{" "}
            <span className="text-muted">@{toUser.username}</span> -{" "}
            <span className="text-muted">{formattedDate}</span>
          </div>
          <div className="text-muted text-nowrap cfs-small overflow-hidden">
            {message.message}
          </div>
        </Col>
      </Row>
    </Link>
  ) : (
    <div>Loading</div>
  );
}

export default ContactCard;
