import { useFetchAlbumsQuery } from "../store";

export default function AlbumList({ user }) {
  const results = useFetchAlbumsQuery(user);

  // console.log(data, error, isLoading);
  console.log(results);
  return <div>Albums for {user.name}</div>;
}
