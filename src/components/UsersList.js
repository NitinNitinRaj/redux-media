import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { addUser, fetchUsers } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import UserListItem from "./UserListItem";

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doAddUser, isCreatingUsers, creatingUsersError] = useThunk(addUser);
  const { data } = useSelector(({ users }) => {
    return users;
  });
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUserClick = () => {
    const name = faker.person.fullName();
    doAddUser(name);
  };

  let content;
  if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else if (isLoadingUsers) {
    content = <Skeleton className="h-10 w-full" times={6} />;
  } else {
    content = data.map((user) => {
      return <UserListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUsers} onClick={handleAddUserClick}>
          + Add User
        </Button>
        {creatingUsersError && "Error creating user"}
      </div>
      <div className="max-h-[calc(100vh-65px)] overflow-y-auto mx-3">
        {content}
      </div>
    </div>
  );
}
