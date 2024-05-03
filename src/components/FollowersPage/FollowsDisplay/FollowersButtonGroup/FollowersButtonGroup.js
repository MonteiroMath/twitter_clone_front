import { ButtonGroup, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function FollowersButtonGroup({ className }) {
  const history = useHistory();
  let { username } = useParams();

  return (
    <ButtonGroup className={`d-flex ${className}`}>
      <Button
        color="light"
        className="cfw-bolder"
        onClick={() => history.push(`/${username}/followers`)}
      >
        Followers
      </Button>
      <Button
        color="light"
        className="cfw-bolder"
        onClick={() => history.push(`/${username}/following`)}
      >
        Following
      </Button>
    </ButtonGroup>
  );
}

FollowersButtonGroup.defaultProps = {
  className: "",
};

export default FollowersButtonGroup;
