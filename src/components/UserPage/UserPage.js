import { useParams } from "react-router-dom";


import MainLayout from "../MainLayout/MainLayout";
import UserProfile from "./UserProfile/UserProfile";
import UserTweetList from "./UserTweetList/UserTweetList";



function UserPage() {
  let { username } = useParams();

  return (
    <MainLayout>
      <UserProfile username={username} />
      <UserTweetList username={username} />
    </MainLayout>
  );
}

export default UserPage;
