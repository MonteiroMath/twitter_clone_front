import { Row, Col } from "reactstrap";
import Avatar from "../../../Shared/Avatar/Avatar";

function ContactCard({ conversation }) {
  return (
    <Row className="mt-4">
      <Col lg="4" xl="3">
        <Avatar />
      </Col>
      <Col>
        <div>
          <span className="cfw-bolder">{conversation.recipientID} </span> -{" "}
          <span className="text-muted">{conversation.createdAt}</span>
        </div>
        <div>{conversation.message}</div>
      </Col>
    </Row>
  );
}

export default ContactCard;
