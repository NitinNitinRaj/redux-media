import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { faker } from "@faker-js/faker";
import AlbumsListItem from "./AlbumsListItem";

export default function AlbumList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddNewAlbum = () => {
    addAlbum({ userId: user.id, title: faker.commerce.productName() });
  };

  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-12 w-full" />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album}></AlbumsListItem>;
    });
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between m-2">
        <h3 className="font-bold">Albums of {user.name}</h3>
        {results.isError && <p>Error adding new album</p>}
        <Button loading={results.isLoading} onClick={handleAddNewAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}
