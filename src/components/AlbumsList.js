import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { faker } from "@faker-js/faker";

export default function AlbumList({ user }) {
  const { data, error, isLoading, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddNewAlbum = () => {
    addAlbum({ id: user.id, title: faker.commerce.productName() });
  };

  let content;
  if (isLoading || isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between pt-2">
        <p>Albums of {user.name}</p>
        {results.isError && <p>Error adding new album</p>}
        <Button loading={results.isLoading} onClick={handleAddNewAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}
