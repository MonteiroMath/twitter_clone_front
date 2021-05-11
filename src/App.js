import "./App.css";
import "./components/Feed";
import Feed from "./components/Feed";
import RightBar from "./components/RightBar";
import LeftBar from "./components/LeftBar";

import { Row } from "reactstrap";

function App() {
  return (
    <div className="bg-light">
      <Row noGutters>
        <LeftBar />
        <Feed />
        <RightBar />
      </Row>
    </div>
  );
}

export default App;
