import { Container, Row } from "reactstrap";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TopBar({ username, className }) {
  const history = useHistory();

  return (
    <Container>
      <Row className={`align-items-center ${className}`}>
        <RiArrowGoBackLine
          className="cpointer"
          onClick={() => history.goBack()}
        />
        <div className="ml-4">
          <div className="cfw-bolder">{username}</div>
          <div className="cfc-gray cfs-small">{`@${username}`}</div>
        </div>
      </Row>
    </Container>
  );
}

export default TopBar;
