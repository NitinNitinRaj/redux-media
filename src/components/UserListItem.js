import { GoTrash } from "react-icons/go";
import Button from "./Button";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import { Fragment } from "react";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumsList";

export default function UserListItem({ user }) {
  const [doDeleteUser, isDeleteLoading, deleteError] = useThunk(deleteUser);

  const handleUserDeleteClick = () => {
    doDeleteUser(user);
  };

  const header = (
    <>
      <Button
        loading={isDeleteLoading}
        onClick={handleUserDeleteClick}
        className="mr-3"
      >
        <GoTrash />
      </Button>
      {deleteError && <div>Error Deleting user.</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  );
}
