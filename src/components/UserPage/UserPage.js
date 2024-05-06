import { useParams } from "react-router-dom";


import MainLayout from "../MainLayout/MainLayout";
import UserProfile from "./UserProfile/UserProfile";
import FeedTweetList from "../FeedPage/FeedTweetList/FeedTweetList";


function UserPage() {
  let { username } = useParams();

  return (
    <MainLayout>
      <UserProfile username={username} />
      <FeedTweetList username={username} />
    </MainLayout>
  );
}

export default UserPage;
