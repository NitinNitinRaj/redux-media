import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

export default function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(({ users }) => {
    return users;
  });
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="h-10 w-full" times={6} />;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  return <div>{data.length}</div>;
}
