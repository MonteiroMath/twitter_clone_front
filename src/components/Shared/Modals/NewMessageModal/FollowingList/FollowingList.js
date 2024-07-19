import FollowingCard from "./FollowingCard/FollowingCard/FollowingCard";

function FollowingList({ userList, handleUserSelection, selectedUser }) {
  return (
    <>
      {userList.length !== 0 ? (
        userList.map((user) => (
          <FollowingCard
            handleClick={() => handleUserSelection(user.user.id)}
            key={user.id}
            user={user}
            selected={selectedUser === user.id}
          />
        ))
      ) : (
        <div className="mt-5 mb-3 text-center">
          {" "}
          You aren't following anyone yet
        </div>
      )}
    </>
  );
}

export default FollowingList;
