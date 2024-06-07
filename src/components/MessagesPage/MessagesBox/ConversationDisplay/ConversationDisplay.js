import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Row, Col, Input, Button } from "reactstrap";
import TopBar from "../../../Shared/Bars/TopBar/TopBar";
import Avatar from "../../../Shared/Avatar/Avatar";
import { CiImageOff } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import styles from "../../MessagesPage.module.css";

import { selectUserData, selectJwtToken } from "../../../../store/UserSlice";

import { client } from "../../../../api/client";
import { useEffect } from "react";

function ConversationDisplay() {
  //get messages from user messaged

  const { recipientName } = useParams();
  const userData = useSelector(selectUserData);
  const jwtToken = useSelector(selectJwtToken);

  const [recipientUser, setRecipientUser] = useState({});
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    //setLoadingState("loading");
    client.getUserData(recipientName, jwtToken).then((result) => {
      if (result.success) {
        setRecipientUser(result.user);
        //setLoadingState("success");
      } else {
        //setLoadingState("failed");
        console.log("error");
      }
    });
  }, [recipientName, jwtToken]);

  useEffect(() => {
    if (recipientUser.id) {
      client
        .getMessages(userData.id, recipientUser.id, jwtToken)
        .then((result) => {
          if (result.success) {
            setMessageList(result.messages);
          } else {
            console.log("error");
          }
        });
    }
  }, [recipientUser.id, userData.id, jwtToken]);

  return (
    <div className={`d-flex flex-column ${styles.h100}`}>
      <TopBar header="Matham" />

      <Row className={`flex-column align-items-center p-4 ${styles.rowGap}`}>
        <Avatar avatar={recipientUser.avatar} />
        <div>{recipientUser.username}</div>
        <div>{`@${recipientUser.username}`}</div>
        <div>{recipientUser.description}</div>
      </Row>
      <Row className="flex-column align-items-end pr-5">
        {messageList.map((message) => (
          <div key={message.id}>{message.message}</div>
        ))}
      </Row>
      <Row className="d-flex mt-auto pb-4 justify-content-around align-items-center px-4">
        <div>
          <CiImageOff size="24" />
          <MdOutlineGifBox size="24" />
        </div>
        <Col>
          <Input placeholder="Start a new message" />
        </Col>
        <Button color="primary" size="sm">
          Send
        </Button>
      </Row>
    </div>
  );
}

export default ConversationDisplay;
