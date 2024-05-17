import { Row, Col } from "reactstrap";
import Avatar from "../../../Shared/Avatar/Avatar";

function ContactCard() {
  return (
    <Row className="mt-4">
      <Col lg="4" xl="3">
        <Avatar />
      </Col>
      <Col>
        <div>
          <span className="cfw-bolder">Contact name </span> -{" "}
          <span className="text-muted">December 12</span>
        </div>
        <div>last message...</div>{" "}
      </Col>
    </Row>
  );
}

export default ContactCard;
