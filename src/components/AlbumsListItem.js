import { GoTrash } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";
import { useRemoveAlbumMutation } from "../store";

export default function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const handleDeleteClick = () => {
    removeAlbum(album);
  };
  const header = (
    <>
      <Button
        loading={results.isLoading}
        onClick={handleDeleteClick}
        className="mr-2"
      >
        <GoTrash />
      </Button>
      {album.title}
      {results.error && <p className="ml-2">Error deleing the album</p>}
    </>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}
