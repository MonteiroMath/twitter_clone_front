import { Spinner } from "reactstrap";

import MainLayout from "../../MainLayout/MainLayout";
import TopBar from "./TopBar/TopBar";
import FollowersButtonGroup from "./FollowersButtonGroup/FollowersButtonGroup";
import FollowerList from "./FollowerList/FollowerList";

function FollowsDisplay({ username, loadingState, userList }) {
  return (
    <MainLayout>
      <TopBar className="mt-1 ml-2 mb-2" username={username} />
      <FollowersButtonGroup className="mb-4" />

      {loadingState === "loading" && (
        <div className="d-flex justify-content-center">
          <Spinner color="info" />
        </div>
      )}

      {loadingState === "success" && <FollowerList userList={userList} />}

      {loadingState === "failed" && (
        <div className="d-flex justify-content-center cfs-30 cfw-bold">
          Something went wrong!
        </div>
      )}
    </MainLayout>
  );
}

export default FollowsDisplay;
