import { GoTrash } from "react-icons/go";
import Button from "./Button";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/use-thunk";

export default function UserListItem({ user }) {
  const [doDeleteUser, isDeleteLoading, deleteError] = useThunk(deleteUser);

  const handleUserDeleteClick = () => {
    doDeleteUser(user);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 items-center justify-between cursor-pointer">
        <div className="flex justify-between items-center">
          <Button
            loading={isDeleteLoading}
            onClick={handleUserDeleteClick}
            className="mr-3"
          >
            <GoTrash />
          </Button>
          {deleteError && <div>Error Deleting user.</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
}
