import { useSelector } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import { addUser, fetchUsers } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { faker } from "@faker-js/faker";
import { useEffect } from "react";

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

  if (isLoadingUsers) {
    return <Skeleton className="h-10 w-full" times={6} />;
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUsers ? (
          "Creating User..."
        ) : (
          <Button onClick={handleAddUserClick}>+ Add User</Button>
        )}
        {creatingUsersError && "Error creating user"}
      </div>
      <div className="max-h-[calc(100vh-65px)] overflow-y-auto">
        {renderedUsers}
      </div>
    </div>
  );
}
