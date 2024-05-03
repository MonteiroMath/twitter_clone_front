import FollowerCard from "./FollowerCard/FollowerCard";

function FollowerList({ userList }) {
  return (
    <>
      {userList.map((follower) => (
        <FollowerCard follower={follower} />
      ))}
    </>
  );
}

export default FollowerList;
