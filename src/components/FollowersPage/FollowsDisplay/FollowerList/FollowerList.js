import FollowerCard from "./FollowerCard/FollowerCard";

function FollowerList({ userList }) {
  return (
    <>
      {userList.length === 0 ? (
        <div className="cfw-bolder ml-5">Oooops, not one to show here!</div>
      ) : (
        userList.map((follower) => <FollowerCard follower={follower} />)
      )}
    </>
  );
}

export default FollowerList;
