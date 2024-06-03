import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { Row, Col, Input, Button } from "reactstrap";
import { selectUserData } from "../../../store/UserSlice";
import TopBar from "../../Shared/Bars/TopBar/TopBar";
import Avatar from "../../Shared/Avatar/Avatar";
import { CiImageOff } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import styles from "../MessagesPage.module.css";

import StartConversation from "./StartConversation/StartConversation";

function MessagesBox() {
  const { recipientID } = useParams;
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const socket = io("http://localhost:6868");
  }, []);

  return recipientID ? (
    <div className={`d-flex flex-column ${styles.h100}`}>
      <TopBar header="Matham" />

      <Row className={`flex-column align-items-center p-4 ${styles.rowGap}`}>
        <Avatar />
        <div>{userData.username}</div>
        <div>{`@${userData.username}`}</div>
        <div>{userData.description}</div>
      </Row>
      <Row className="flex-column align-items-end pr-5">
        <div>Message 1</div>
        <div>Message 2</div>
        <div>Message 3</div>
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
  ) : (
    <StartConversation />
  );
}



export default MessagesBox;
